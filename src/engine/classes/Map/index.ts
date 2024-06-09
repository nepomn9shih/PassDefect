import {Scene, Tilemaps} from 'phaser';

import {MapProps} from './types';

export class GameMap {
	scene: Scene;
	key: string;
	tileSetName: string;
	mapLayerName: string;
	map: Tilemaps.Tilemap;
	tiles: Tilemaps.Tileset | null;
	mapLayer: Tilemaps.TilemapLayer | null;

	constructor({
		scene,
		key,
		tileSetName,
		mapLayerName
	}: MapProps) {
		this.scene = scene;
		this.key = key;
		this.tileSetName = tileSetName;
		this.mapLayerName = mapLayerName;

		this.createMap();
	}

	createMap() {
		// Создаем карту
		this.map = this.scene.make.tilemap({key: this.key});

		// Добавляем картинку тайлсета карты
		this.tiles = this.map.addTilesetImage(this.key, this.tileSetName);

		if (this.tiles) {
			// Создаем слой с фоном карты
			this.mapLayer = this.map.createLayer(this.mapLayerName, this.tiles, 0, 0);
			// Создаем границы карты
			this.scene.physics.world.bounds.width = this.map.widthInPixels;
			this.scene.physics.world.bounds.height = this.map.heightInPixels;
		}
	}
}
