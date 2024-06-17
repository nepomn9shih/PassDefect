import {Scene} from 'phaser';
import {Action, Store} from '@reduxjs/toolkit';

import {
    FONT_FAMILY_STYLE,
    LOADING_BOX_HEIGHT,
    LOADING_BOX_WIDTH,
    TEXT_SCALE
} from '../constants';
import {AtlasesKeys, SceneNames} from '../enums';
import {MAP_ATLASES} from '../assets/map';
import {DPR} from '../constants/zoom';
import {AllGameState} from '../../reducers/types';
import {PLAYER_ATLASES} from '../assets/player';
import {OBJECTS_ATLASES} from '../assets/objects';

export class BootScene extends Scene {
    store: Store<AllGameState, Action<string>>;

    constructor(store: Store<AllGameState, Action<string>>) {
        super(SceneNames.BOOT);
        this.store = store;
    }

    preload() {
		// По умолчанию одновременно загружается 32 файла, можно изменить
		// this.load.maxParallelDownloads = 100;

		this.load.on('loaderror', (file: Phaser.Loader.File) => {
			const message = `Error: Image not loaded. File url: ${file.url}`;
			// логируем ошибки загрузки
			console.log(message);
		});

		// Загружаем конфиги тайловых карт
		this.loadTileMap();
		// Загружаем изображения
		this.loadImages();
		// Загружаем атлас с игровыми объектами
		this.loadAtlas();
		// Создаем прогресс-бар загрузки файлов игры
		this.createLoadingBar();
	}

	loadImages() {
		// this.load.image('image', Image);
	}

	loadTileMap() {
		// Картинка тайлов для карты
		this.load.image(
			AtlasesKeys.SWAMP_PLANET_LEVEL_MAP,
			MAP_ATLASES[AtlasesKeys.SWAMP_PLANET_LEVEL_MAP].imgUrl
		);
		// Конфиги карт созданные в Tiled в формате JSON (TMJ)
		this.load.tilemapTiledJSON(
			AtlasesKeys.SWAMP_PLANET_LEVEL_MAP,
			MAP_ATLASES[AtlasesKeys.SWAMP_PLANET_LEVEL_MAP].jsonUrl
		);
	}

	loadAtlas() {
		// Object.keys(atlases).forEach((key) => {
        //     this.load.atlas(
        //         `${key}`,
        //         ATLASES[key].imgUrl,
        //         ATLASES[key].jsonUrl
        //     );
		// });

		this.load.atlas(
			AtlasesKeys.SPACEMAN_PLAYER_SKIN,
			PLAYER_ATLASES[AtlasesKeys.SPACEMAN_PLAYER_SKIN].imgUrl,
			PLAYER_ATLASES[AtlasesKeys.SPACEMAN_PLAYER_SKIN].jsonUrl
		);

		this.load.atlas(
			AtlasesKeys.PICK_UP_OBJECTS,
			OBJECTS_ATLASES[AtlasesKeys.PICK_UP_OBJECTS].imgUrl,
			OBJECTS_ATLASES[AtlasesKeys.PICK_UP_OBJECTS].jsonUrl
		);
	}

	createLoadingBar() {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;

		// Создание текста при загрузке
		const loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 100,
			text: 'Загружаем игру',
			style: {
				fontFamily: FONT_FAMILY_STYLE,
				fontSize: '20px',
				color: '#ffffff'
			}
		});
		loadingText
			.setOrigin(0.5, 0.5)
			.setResolution(TEXT_SCALE)
			.setScale(DPR);

		// Создаие рамки прогресс-бара загрузки
		const progressBox = this.add.graphics();

		// Создание полосы загрузки
		const progressBar = this.add.graphics();
		progressBox
			.fillStyle(0x393D48, 1)
			.fillRoundedRect(
				(width - LOADING_BOX_WIDTH * DPR) / 2,
				(height - LOADING_BOX_HEIGHT * DPR) / 2,
				LOADING_BOX_WIDTH * DPR,
				LOADING_BOX_HEIGHT * DPR,
				10 * DPR
			);

		// Обработчик события начала процесса загрузки
		this.load.on('progress', function(value: number) {
			progressBar.clear();
			progressBar.fillStyle(0x8b3ffd, 1);
			progressBar.fillRoundedRect(
				(width - LOADING_BOX_WIDTH * DPR) / 2,
				(height - LOADING_BOX_HEIGHT * DPR) / 2,
				LOADING_BOX_WIDTH * value * DPR,
				LOADING_BOX_HEIGHT * DPR,
				10 * DPR
			);
		});

		// Обработчик события завершения загрузки
		this.load.on('complete', function() {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
		});
	}

	create() {
		// После загрузки запускаем главную сцену
		this.scene.start(SceneNames.MAIN);
	}
}
