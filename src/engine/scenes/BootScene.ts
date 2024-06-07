import {Scene} from 'phaser';
import {Store} from '@reduxjs/toolkit';

import {BOOT_SCENE_NAME, MAIN_SCENE_NAME} from '../constants';

export class BootScene extends Scene {
    store: Store<any, any>;

    constructor(store: Store<any, any>) {
        super(BOOT_SCENE_NAME);
        this.store = store;
    }

    preload() {}

    create() {
        this.scene.start(MAIN_SCENE_NAME);
    }
}