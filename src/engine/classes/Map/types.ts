export type MapProps = {
	/** Сцена в которой находится карта */
	scene: any;
	/** Назваие ключа Tiled JSON файла карты */
	key: string;
	/** Назваие ключа изображения тайлсета карты */
	tileSetName: string;
	/** Слой с фоном карты */
	mapLayerName: string;
	/** Слой с блокирующими элементами */
	blockedLayerName: string;
};
