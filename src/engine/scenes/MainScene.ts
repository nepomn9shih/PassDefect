import {Action, Store} from '@reduxjs/toolkit';
import {Scene} from 'phaser';

import {GameMap} from '../classes/Map';
import {LevelMaps, MapLayersNames, PlayerSkinVariations, SceneNames} from '../enums';
import {AllGameState} from '../../reducers/types';
import {CameraManager} from '../managers/CameraManager';
import {Player} from '../classes/Player';
import {GameManager} from '../managers/GameManager';

export class MainScene extends Scene {
    store: Store<AllGameState, Action<string>>;
    state: AllGameState;
    map: GameMap;
    player: Player;
    playerSkin: PlayerSkinVariations;
    cameraManager: CameraManager;
    gameManager: GameManager;

    constructor(store: Store<AllGameState, Action<string>>) {
        super(SceneNames.MAIN);
        this.store = store;
        this.state = store.getState();
        // потом брать из стейта
        this.playerSkin = PlayerSkinVariations.SPACEMAN
    }

    create() {
        this.createMap();
        this.createCameraManager();
        this.createGameManager();
    }

    createMap() {
		// Создаем карту
		this.map = new GameMap({
			scene: this,
			key: LevelMaps.SWAMP_PLANET,
			tileSetName: LevelMaps.SWAMP_PLANET,
			mapLayerName: MapLayersNames.MAP,
            blockerLayerName: MapLayersNames.BLOCKER,
		});
	}

    createPlayer(location: number[]) {
		// Создаем игрока
		this.player = new Player({
			scene: this,
			skin: this.playerSkin,
            x: location[0],
            y: location[1]
		});
	}

    createCameraManager() {
		this.cameraManager = new CameraManager({scene: this});
		this.cameraManager.setup();
	}

    createGameManager() {
        this.events.on('spawnPlayer', (location: number[]) => {
            this.createPlayer(location);
            this.addCollisions();
        });

		this.gameManager = new GameManager({scene: this, mapData: this.map.map.objects});
		this.gameManager.setup();
	}

    addCollisions() {
        if (this.map.blockerLayer) {
            // Проверка коллизий между игроком и слоем заблоченных тайлов
            this.physics.add.collider(this.player, this.map.blockerLayer);
        }
        
        // Проверка коллизий между игроком и сундуков
        // this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }

    update() {
        // if (this.player) {
        //     this.player.update(this.cursors);
        // };
    }
}