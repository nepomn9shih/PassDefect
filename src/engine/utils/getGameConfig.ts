import {Scene} from 'phaser';
// import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import type {Types} from 'phaser';

import {GAME_PASS_DEFECT_ID} from '../constants';
import {screenHeight, screenWidth} from '../constants/zoom';

export const getGameConfig = (scenes: Scene[]): Types.Core.GameConfig => ({
    // Автовыбор WebGl или Canvas
    type: Phaser.AUTO,
    parent: GAME_PASS_DEFECT_ID,
    scene: scenes,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
            debug: false
        }
    },
    scale: {
        parent: GAME_PASS_DEFECT_ID,
        mode: Phaser.Scale.FIT,
        width: screenWidth,
        height: screenHeight
    },
    // убираем ограничение по одновременной загрузке текстур
    maxTextures: -1,
    pixelArt: true,
    roundPixels: true,
    // plugins: {
    //     scene: [{
    //         key: 'rexGestures',
    //         plugin: GesturesPlugin,
    //         mapping: 'rexGestures'
    //     }]
    // }
});