import {MapObject} from './../../classes/MapObject/index';
import {
	ChestVariations,
	GameEvents,
	MapObjectVariations,
	ObjectLayersNames,
	SpawnerImageVariations
} from '../../enums';
import {MainScene} from '../../scenes';
import type {GameManagerProps} from './types';
import {MAP_OBJECTS_STUB} from '../../constants/map-objects';
import {getRandomNumber} from '../../utils/getRandomNumber';
import type { ChestModel } from '../../classes/ChestModel';
import type { MonsterModel } from '../../classes/MonsterModel';
import { PlayerModel } from '../../classes/Player/PlayerModel';
import type { Spawner } from '../../classes/Spawner';
import { SpawnerImage } from '../../classes/Spawner/SpawnerImage';
import { getTiledProperty } from '../../utils/getTiledProperty';
import { SPAWNER_PROPERTY_NAME } from '../../constants';
import type { Chest } from '../../classes/ChestModel/Chest';
import type { PlayerContainer } from '../../classes/Player/PlayerContainer';

/**
 * Менеджер отвечающий за основные процессы игры
 * и хранящий данные о спавнерах, игроке, монстрах и сундуках
 * */
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
		// Когда поднимаем сундук
		this.scene.events.on(GameEvents.PICK_UP_CHEST, (chestId: string) => {
			if (this.chests[chestId]) {
				const {gold, hearts, bolts, armor} = this.chests[chestId];

				if (gold) {
					// Добавляем валюту игроку
					this.scene.player.getGold(gold);
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

		// Когда убираем сундук
		this.scene.events.on(GameEvents.REMOVE_CHEST, (chestId: string) => {
            const chests = this.scene.chests.getChildren() as Chest[];
            chests.forEach((chest) => {
                if (chest.id === chestId) {
                    chest.makeInactive();
                }
            });
        });

		// Когда монстр убит
		this.scene.events.on(GameEvents.DESTROY_MONSTER, (monsterId: string) => {
			if (this.monsters[monsterId]) {
				// Добавляем награды за убийство врага
				const {sculls, gold} = this.monsters[monsterId];
				this.scene.stateManager.setSculls(sculls);
				this.scene.stateManager.setGold(gold);
				this.scene.player.getSculls(sculls);
				this.scene.player.getGold(gold);

				this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
			}
		});

		// Когда происходит респавн игрока
		this.scene.events.on(GameEvents.RESPAWN_PLAYER, (playerId: string) => {
            this.players[playerId].respawn();
			this.scene.player.respawn(this.players[playerId]);
		});

		// Когда повышается уровень игрока
		this.scene.events.on(GameEvents.LEVEL_UP_PLAYER, (newLevel: number) => {
            console.log(`Cool! You have reached level ${newLevel}`)
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

	addChest(chestId: string, chest: ChestModel) {
		this.chests[chestId] = chest;
		this.scene.events.emit(GameEvents.SPAWN_CHEST, chest);
	}

	deleteChest(chestId: string) {
		delete this.chests[chestId];
	}

	collectChest(player: PlayerContainer, chest: Chest) {
		// this.goldPickupAudio.play();

		// Если у игрока полная броня то не подбираем сундук
		if (
			chest.variation === ChestVariations.ARMOR 
				&& player.armor === player.maxArmor
		) {
			return;
		}

		// Если у игрока полная обойма потронов то не подбираем сундук
		if (
			chest.variation === ChestVariations.BOLTS
				&& player.bolts === player.maxBolts
		) {
			return;
		}

		// Если у игрока полное здоровье то не подбираем сундук
		if (
			chest.variation === ChestVariations.HEART
				&& player.health === player.maxHealth
		) {
			return;
		}

		this.scene.events.emit(GameEvents.PICK_UP_CHEST, chest.id, player.id);
	}	
	
	addMonster(monsterId: string, monster: MonsterModel) {
		this.monsters[monsterId] = monster;
		this.scene.events.emit(GameEvents.SPAWN_MONSTER, monster);
	}
	
	deleteMonster(monsterId: string) {
		delete this.monsters[monsterId];
	}

	addPlayer() {
		const player = new PlayerModel(this.scene.gameManager.playerLocations);
		this.players[player.id] = player;
		this.scene.events.emit(GameEvents.SPAWN_PLAYER, player);	
	}

	// Удаляем блокеры которые накладываются на спавнеры
    deleteBlocker(_spawner: SpawnerImage, blocker: MapObject) {
        blocker.destroy();
    }
}