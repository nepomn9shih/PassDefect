import {Action, Store} from '@reduxjs/toolkit';
import {Scene} from 'phaser';

import {GameMap} from '../classes/Map';
import {LevelMaps, MapLayersNames, SceneNames} from '../enums';
import {AllGameState} from '../../reducers/types';
import { CameraManager } from '../managers/CameraManager';

export class MainScene extends Scene {
    store: Store<AllGameState, Action<string>>;
    state: AllGameState;
    map: GameMap;
    cameraManager: CameraManager;

    constructor(store: Store<AllGameState, Action<string>>) {
        super(SceneNames.MAIN);
        this.store = store;
        this.state = store.getState();
    }

    create() {
        this.createMap();
        this.createGameManager();
    }

    createMap() {
		// Создаем карту
		this.map = new GameMap({
			scene: this,
			key: LevelMaps.SWAMP_PLANET,
			tileSetName: LevelMaps.SWAMP_PLANET,
			mapLayerName: MapLayersNames.MAP,
		});
	}

    createGameManager() {
		this.cameraManager = new CameraManager({scene: this});
		this.cameraManager.setup();
	}
}