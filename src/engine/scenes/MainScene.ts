import {Store} from '@reduxjs/toolkit';
import {Scene, Tilemaps} from 'phaser';

import {MAIN_SCENE_NAME} from '../constants';

export class MainScene extends Scene {
    store: Store<any, any>;
    state: any;
    map: Tilemaps.Tilemap;

    constructor(store: Store<any, any>) {
        super(MAIN_SCENE_NAME);
        this.store = store;
        this.state = store.getState();
    }

    create() {
        
    }
}