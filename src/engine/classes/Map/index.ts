import {Scene, Tilemaps} from 'phaser';

import {MapProps} from './types';

export class GameMap {
	scene: Scene;
	key: string;
	tileSetName: string;
	mapLayerName: string;
	playerLayerName: string;
	map: Tilemaps.Tilemap;
	tiles: Tilemaps.Tileset | null;
	mapLayer: Tilemaps.TilemapLayer | null;
	playerLayer: Phaser.GameObjects.Layer | null;

	constructor({
		scene,
		key,
		tileSetName,
		mapLayerName,
		playerLayerName
	}: MapProps) {
		this.scene = scene;
		this.key = key;
		this.tileSetName = tileSetName;
		this.mapLayerName = mapLayerName;
		this.playerLayerName = playerLayerName;

		this.createMap();
	}

	createMap() {
		// Создаем карту
		this.map = this.scene.make.tilemap({key: this.key});

		// Добавляем картинку тайлсета карты
		this.tiles = this.map.addTilesetImage(this.key, this.tileSetName, 64, 64, 2, 4);

		if (this.tiles) {
			// Создаем слой с фоном карты
			this.mapLayer = this.map.createLayer(this.mapLayerName, this.tiles, 0, 0);
			// Создаем слой с игроком
			this.playerLayer = this.scene.add.layer();
			// если надо сменить очередность слоев
			// this.playerLayer.setDepth(layesrsZIndexes.playersLayer);
			// Создаем границы карты
			this.scene.physics.world.bounds.width = this.map.widthInPixels;
			this.scene.physics.world.bounds.height = this.map.heightInPixels;
		}
	}
}
