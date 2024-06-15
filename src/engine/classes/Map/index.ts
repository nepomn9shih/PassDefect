import {Scene, Tilemaps} from 'phaser';

import {MapProps} from './types';

export class GameMap {
	scene: Scene;
	key: string;
	tileSetName: string;
	mapLayerName: string;
	blockerLayerName: string;
	map: Tilemaps.Tilemap;
	tiles: Tilemaps.Tileset | null;
	mapLayer: Tilemaps.TilemapLayer | null;
	blockerLayer: Tilemaps.TilemapLayer | null;

	constructor({
		scene,
		key,
		tileSetName,
		mapLayerName,
		blockerLayerName
	}: MapProps) {
		this.scene = scene;
		this.key = key;
		this.tileSetName = tileSetName;
		this.mapLayerName = mapLayerName;
		this.blockerLayerName = blockerLayerName;

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
			this.blockerLayer = this.map.createLayer(this.blockerLayerName, this.tiles, 0, 0);
			// если надо сменить очередность слоев
			// this.blockerLayer.setDepth(layesrsZIndexes.playersLayer);

			// Настраиваем коллизии. [-1] значит что все тайлы слоя будут проверены на коллизию
			this.blockerLayer?.setCollisionByExclusion([-1]);

			// Создаем границы карты
			this.scene.physics.world.bounds.width = this.map.widthInPixels;
			this.scene.physics.world.bounds.height = this.map.heightInPixels;
		}
	}
}
