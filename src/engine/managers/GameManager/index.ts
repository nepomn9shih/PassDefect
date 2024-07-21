import {ChestModel} from '../../classes/ChestModel';
import {MonsterModel} from '../../classes/MonsterModel';
import {Spawner} from '../../classes/Spawner';
import {SPAWNER_PROPERTY_NAME} from '../../constants';
import {GameEvents, ObjectLayersNames, SpawnObjects} from '../../enums';
import {MainScene} from '../../scenes';
import {getTiledProperty} from '../../utils/getTiledProperty';
import {GameManagerProps} from './types';

export class GameManager {
	scene: MainScene;
	mapData: Phaser.Tilemaps.ObjectLayer[];
	spawners: Record<string, Spawner>;
	chests: Record<string, ChestModel>;
	monsters: Record<string, MonsterModel>;
	playerLocations: (number | undefined)[][];
	chestLocations: Record<any, (number | undefined)[][]>;
	monsterLocations: Record<any, (number | undefined)[][]>;

	constructor({scene, mapData}: GameManagerProps) {
		this.scene = scene;
		this.mapData = mapData;
		this.spawners = {};
		this.chests = {};
		this.monsters = {};
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
	}

	setupSpawners() {
		const config = {
			spawnInterval: 3000,
			limit: 1,
			spawnerType: SpawnObjects.CHEST,
			id: '',
		};
			
		let spawner: Spawner;

		// Создаем спавнер сундука
		Object.keys(this.chestLocations).forEach((key) => {
			config.id = `chest-${key}`;

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
			config.id = `monster-${key}`; 
			
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
		const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
		
		this.scene.events.emit(GameEvents.SPAWN_PLAYER, location);	
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