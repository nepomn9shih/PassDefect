import {Scene, Tilemaps} from 'phaser';

import type {MapProps} from './types';

export class GameMap {
	scene: Scene;
	key: string;
	tileSetName: string;
	mapLayerName: string;
	blockedLayerName: string;
	map: Tilemaps.Tilemap | null = null;
	tiles: Tilemaps.Tileset | null = null;
	mapLayer: Tilemaps.TilemapLayer | null = null;
	blockedLayer: Tilemaps.TilemapLayer | null = null;

	constructor({
		scene,
		key,
		tileSetName,
		mapLayerName,
		blockedLayerName
	}: MapProps) {
		this.scene = scene;
		this.key = key;
		this.tileSetName = tileSetName;
		this.mapLayerName = mapLayerName;
		this.blockedLayerName = blockedLayerName;

		this.createMap();
	}

	createMap() {
		// Создаем карту
		this.map = this.scene.make.tilemap({key: this.key});

		// Добавляем картинку тайлсета карты
		this.tiles = this.map.addTilesetImage(this.key, this.tileSetName, 64, 64, 0, 0);

		if (this.tiles) {
			// Создаем слой с фоном карты
			this.mapLayer = this.map.createLayer(this.mapLayerName, this.tiles, 0, 0);
			// Создаем слой с игроком
			this.blockedLayer = this.map.createLayer(this.blockedLayerName, this.tiles, 0, 0);
			// если надо сменить очередность слоев
			// this.blockedLayer.setDepth(layesrsZIndexes.playersLayer);

			// Настраиваем коллизии. [-1] значит что все тайлы слоя будут проверены на коллизию
			this.blockedLayer?.setCollisionByExclusion([-1]);

			// Создаем границы карты
			this.scene.physics.world.bounds.width = this.map.widthInPixels;
			this.scene.physics.world.bounds.height = this.map.heightInPixels;
		}
	}
}
