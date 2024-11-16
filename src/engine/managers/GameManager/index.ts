import {ChestModel} from '../../classes/ChestModel';
import {MonsterModel} from '../../classes/MonsterModel';
import {Spawner} from '../../classes/Spawner';
import {SPAWNER_PROPERTY_NAME} from '../../constants';
import {GameEvents, ObjectLayersNames, SpawnObjects} from '../../enums';
import {MainScene} from '../../scenes';
import {getTiledProperty} from '../../utils/getTiledProperty';
import {PlayerModel} from './PlayerModel';
import {GameManagerProps} from './types';

export class GameManager {
	scene: MainScene;
	mapData: Phaser.Tilemaps.ObjectLayer[];
	spawners: Record<string, Spawner>;
	chests: Record<string, ChestModel>;
	monsters: Record<string, MonsterModel>;
	players: Record<string, PlayerModel>;
	playerLocations: (number)[][];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	chestLocations: Record<any, (number | undefined)[][]>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	monsterLocations: Record<any, (number | undefined)[][]>;

	constructor({scene, mapData}: GameManagerProps) {
		this.scene = scene;
		this.mapData = mapData;
		this.spawners = {};
		this.chests = {};
		this.monsters = {};
		this.players = {};
		this.playerLocations = [];
		this.chestLocations = {};
		this.monsterLocations = {};
	}

	setup() {
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
				});
			}
		});
	}

	setupEventListener() {
		this.scene.events.on(GameEvents.PICK_UP_CHEST, (chestId: string) => {
			// Обновляем спавнер
			if (this.chests[chestId]) {
				// Удаляем сундук
				this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
			}
		});

		this.scene.events.on(GameEvents.DESTROY_MONSTER, (monsterId: string) => {
			if (this.monsters[monsterId]) {
				this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
			}
		});
	}

	setupSpawners() {	
		let spawner: Spawner;

		// Создаем спавнер сундука
		Object.keys(this.chestLocations).forEach((key) => {
			const config = {
				spawnInterval: 3000,
				limit: 1,
				id: `chest-${key}`,
				spawnerType: SpawnObjects.CHEST
			};

			spawner = new Spawner({
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
				spawnInterval: 15000,
				limit: 1,
				id: `monster-${key}`,
				spawnerType: SpawnObjects.MONSTER
			};
			
			spawner = new Spawner({
				config,
				spawnLocations: this.monsterLocations[key],
				addObject: this.addMonster.bind(this),
				deleteObject: this.deleteMonster.bind(this),
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