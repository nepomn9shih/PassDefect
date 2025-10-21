import {MapObject} from './../../classes/MapObject/index';
import {addMoney, looseMoney} from '../../../reducers/slices';
import {ChestModel} from '../../classes/ChestModel';
import {MonsterModel} from '../../classes/MonsterModel';
import {PlayerModel} from '../../classes/Player/PlayerModel';
import {Spawner} from '../../classes/Spawner';
import {SpawnerImage} from '../../classes/Spawner/SpawnerImage';
import {SPAWNER_PROPERTY_NAME} from '../../constants';
import {GameEvents, MapObjectVariations, ObjectLayersNames, SpawnerImageVariations, SpawnObjects} from '../../enums';
import {MainScene} from '../../scenes';
import {getTiledProperty} from '../../utils/getTiledProperty';
import {GameManagerProps} from './types';
import {MAP_OBJECTS_STUB} from '../../constants/map-objects';
import {getRandomNumber} from '../../utils/getRandomNumber';
import {CHEST_SPAWN_INTERVAL, MONSTER_SPAWN_INTERVAL} from './constants';

export class GameManager {
	scene: MainScene;
	mapData: Phaser.Tilemaps.ObjectLayer[];
	spawners: Record<string, Spawner>;
	spawnersImages: Record<string, SpawnerImage>;
	chests: Record<string, ChestModel>;
	monsters: Record<string, MonsterModel>;
	players: Record<string, PlayerModel>;
	playerLocations: (number)[][];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	chestLocations: Record<any, (number | undefined)[][]>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	monsterLocations: Record<any, (number | undefined)[][]>;
	mapObjects: Record<string, MapObject>;

	constructor({scene, mapData}: GameManagerProps) {
		this.scene = scene;
		this.mapData = mapData;
		this.spawners = {};
		this.spawnersImages = {};
		this.chests = {};
		this.monsters = {};
		this.players = {};
		this.playerLocations = [];
		this.chestLocations = {};
		this.monsterLocations = {};
		this.mapObjects = {}
	}

	setup() {
		this.drawMapObjects();
		this.parseMapData();
		this.setupEventListener();
		this.setupSpawners();
		this.spawnPlayer();
	}

	parseMapData() {
		this.mapData.forEach((layer)=> {
			if (layer.name === ObjectLayersNames.PLAYER_LOCATIONS) {
				layer.objects.forEach((obj) => {
					const x = obj.x! + (obj.width! / 2);
					const y = obj.y! - (obj.height! / 2);
					this.playerLocations.push([x, y]);

					// рисуем башню чуть выше положения игрока
					this.drawSpawner(x, y - 15, SpawnerImageVariations.PLAYER);
				});
			} else if (layer.name === ObjectLayersNames.CHEST_LOCATIONS) {
				layer.objects.forEach((obj) => {
					const spawner = getTiledProperty(obj, SPAWNER_PROPERTY_NAME);
					const x = obj.x! + (obj.width! / 2);
					const y = obj.y! - (obj.height! / 2);

					if (this.chestLocations[spawner]) {
						this.chestLocations[obj.properties.spawner].push([x, y]);
					} else {
						this.chestLocations[spawner] = [[x, y]];
					}

					this.drawSpawner(x, y, SpawnerImageVariations.CHEST);
				});
			} else if (layer.name === ObjectLayersNames.MONSTER_LOCATIONS) {
				layer.objects.forEach((obj) => {
					const spawner = getTiledProperty(obj, SPAWNER_PROPERTY_NAME);
					const x = obj.x! + (obj.width! / 2);
					const y = obj.y! - (obj.height! / 2);

					if (this.monsterLocations[spawner]) {
						this.monsterLocations[spawner].push([x, y]);
					} else {
						this.monsterLocations[spawner] = [[x, y]];
					}

					this.drawSpawner(x, y, SpawnerImageVariations.MONSTER);
				});
			}
		});
	}

	setupEventListener() {
		this.scene.events.on(GameEvents.PICK_UP_CHEST, (chestId: string, playerId: string) => {
			// Обновляем спавнер
			if (this.chests[chestId]) {
				const {gold, hearts, bolts, armor} = this.chests[chestId];
				console.log(hearts)

				if (gold) {
					// Добавляем валюту игроку
					this.players[playerId].updateGold(gold);
					// Обновляем деньги в интерфейсе
					this.scene.store.dispatch(addMoney(gold))
					this.scene.events.emit(GameEvents.UPDATE_SCORE, this.players[playerId].gold);
				}

				if (hearts) {
					// Обновляем жизни в интерфейсе
					this.scene.player.healHealth(hearts);
				}

				if (bolts) {
					// Обновляем снаряды в интерфейсе
					this.scene.player.getBolts(bolts);
				}

				if (armor) {
					// Обновляем броню в интерфейсе
					this.scene.player.getArmor(armor);
				}
				
				// Удаляем сундук
				this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
				this.scene.events.emit(GameEvents.REMOVE_CHEST, chestId);
			}
		});

		// Когда монстр убит
		this.scene.events.on(GameEvents.DESTROY_MONSTER, (monsterId: string) => {
			if (this.monsters[monsterId]) {
				this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
			}
		});

		// Когда происходит смерть игрока
		this.scene.events.on(GameEvents.DEATH_PLAYER, (playerId: string) => {
            this.players[playerId].looseGold();
			// Обновляем деньги в интерфейсе
			this.scene.store.dispatch(looseMoney());
		});

		// Когда происходит респавн игрока
		this.scene.events.on(GameEvents.RESPAWN_PLAYER, (playerId: string) => {
            this.players[playerId].respawn();
			this.scene.player.respawn(this.players[playerId]);
		});
	}

	// Отрисовать count одинаковых объектов типа variation
	drawCountObjects(variation: MapObjectVariations, count: number) {
		for (let i = 0; i < count; i++) {
			const newObject = new MapObject({
				scene: this.scene,
				x: getRandomNumber(0, this.scene.physics.world.bounds.width),
				y: getRandomNumber(0, this.scene.physics.world.bounds.height),
				variation
			})
	
			this.mapObjects[newObject.id] = newObject;
		}
	}

	// Отрисовать объекты на карте
	drawMapObjects() {
		MAP_OBJECTS_STUB.forEach((object) => {
			const {count, variation} = object;
	
			this.drawCountObjects(variation, count);
		})
	}

	drawSpawner(x: number, y: number, variation: SpawnerImageVariations) {
		const spawner = new SpawnerImage({
			scene: this.scene,
			x,
			y,
			variation
		});

		this.scene.spawners.add(spawner);
		this.spawnersImages[spawner.id] = spawner;
	}

	setupSpawners() {	
		let spawner: Spawner;

		// Создаем спавнер сундука
		Object.keys(this.chestLocations).forEach((key) => {
			const config = {
				spawnInterval: CHEST_SPAWN_INTERVAL,
				limit: 1,
				id: `chest-${key}`,
				spawnerType: SpawnObjects.CHEST
			};

			spawner = new Spawner({
				scene: this.scene,
				config,
				spawnLocations: this.chestLocations[key], 
				addObject: this.addChest.bind(this), 
				deleteObject: this.deleteChest.bind(this)
			});
	
			this.spawners[spawner.id] = spawner;
		});

		// Создаем спавнер монстров
		Object.keys(this.monsterLocations).forEach((key) => {
			const config = {
				spawnInterval: MONSTER_SPAWN_INTERVAL,
				limit: 1,
				id: `monster-${key}`,
				spawnerType: SpawnObjects.MONSTER
			};
			
			spawner = new Spawner({
				scene: this.scene,
				config,
				spawnLocations: this.monsterLocations[key],
				addObject: this.addMonster.bind(this),
				deleteObject: this.deleteMonster.bind(this)
			});

			this.spawners[spawner.id] = spawner;
		});
	}

	spawnPlayer() {
		const player = new PlayerModel(this.playerLocations);
		this.players[player.id] = player;
		
		this.scene.events.emit(GameEvents.SPAWN_PLAYER, player);	
	}

	addChest(chestId: string, chest: ChestModel) {
		this.chests[chestId] = chest;

		this.scene.events.emit(GameEvents.SPAWN_CHEST, chest);
	}

	deleteChest(chestId: string) {
		delete this.chests[chestId];
	}
	
	addMonster(monsterId: string, monster: MonsterModel) {
		this.monsters[monsterId] = monster;
		this.scene.events.emit(GameEvents.SPAWN_MONSTER, monster);
	}
	
	deleteMonster(monsterId: string) {
		delete this.monsters[monsterId];
	}
}