import {ChestModel} from '../../classes/ChestModel';
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
	playerLocations: (number | undefined)[][];
	chestLocations: Record<any, (number | undefined)[][]>;
	monsterLocations: Record<any, (number | undefined)[][]>;

	constructor({scene, mapData}: GameManagerProps) {
		this.scene = scene;
		this.mapData = mapData;
		this.spawners = {};
		this.chests = {};
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
					this.playerLocations.push([obj.x, obj.y]);
				});
			} else if (layer.name === ObjectLayersNames.CHEST_LOCATIONS) {
				layer.objects.forEach((obj) => {
					const spawner = getTiledProperty(obj, SPAWNER_PROPERTY_NAME);

					if (this.chestLocations[spawner]) {
						this.chestLocations[spawner].push([obj.x, obj.y]);
					} else {
						this.chestLocations[spawner] = [[obj.x, obj.y]];
					}
				});
			} else if (layer.name === ObjectLayersNames.MONSTER_LOCATIONS) {
				layer.objects.forEach((obj) => {
					const spawner = getTiledProperty(obj, SPAWNER_PROPERTY_NAME);

					if (this.monsterLocations[spawner]) {
						this.monsterLocations[spawner].push([obj.x, obj.y]);
					} else {
						this.monsterLocations[spawner] = [[obj.x, obj.y]];
					}
				});
			}
		});
	}

	setupEventListener() {}

	setupSpawners() {
		// Создаем спавнер сундука
		Object.keys(this.chestLocations).forEach((key) => {
			const config = {
				spawnInterval: 3000,
				limit: 1,
				spawnerType: SpawnObjects.CHEST,
				id: `chest-${key}`
			};

			const spawner = new Spawner({
				config, 
				spawnLocations: this.chestLocations[key], 
				addObject: this.addChest.bind(this), 
				deleteObject: this.deleteChest.bind(this)
			});
	
			this.spawners[spawner.id] = spawner;
		});
	}

	spawnPlayer() {
		const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
		
		this.scene.events.emit(GameEvents.SPAWN_PLAYER, location);	
	}

	addChest(id: string, chest: ChestModel) {
		this.chests[id] = chest;
		console.log(chest);
	}

	deleteChest() {
	}
}