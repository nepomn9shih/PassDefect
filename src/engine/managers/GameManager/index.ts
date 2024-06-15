import {MainScene} from '../../scenes';
import { getTiledProperty } from '../../utils/getTiledProperty';
import {GameManagerProps} from './types';

export class GameManager {
	scene: MainScene;
	mapData: Phaser.Tilemaps.ObjectLayer[];
	spawners: unknown;
	chests: unknown;
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
			if (layer.name === 'player-locations') {
				layer.objects.forEach((obj) => {
					this.playerLocations.push([obj.x, obj.y]);
				});
			} else if (layer.name === 'chest-locations') {
				layer.objects.forEach((obj) => {
					const spawner = getTiledProperty(obj, 'spawner');

					if (this.chestLocations[spawner]) {
						this.chestLocations[spawner].push([obj.x, obj.y]);
					} else {
						this.chestLocations[spawner] = [[obj.x, obj.y]];
					}
				});
			} else if (layer.name === 'monster-locations') {
				layer.objects.forEach((obj) => {
					const spawner = getTiledProperty(obj, 'spawner');

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

	setupSpawners() {}

	spawnPlayer() {
		const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
		
		this.scene.events.emit('spawnPlayer', location);	
	}
}