import {Scene} from "phaser";
import {MobileControls} from "../classes/MobileControls/MobileControls";
import {SceneNames} from "../enums";
import type {GameStore} from "../types";
import {UPDATE_MOBILE_CONTROLS_EVENT_NAME} from "../constants/events";

export class ControlsScene extends Scene {
    store: GameStore;
    mobileControls!: MobileControls;

    constructor(store: GameStore) {
        super(SceneNames.CONTROLS);
        this.store = store;
    }

    create() {
        this.mobileControls = new MobileControls({scene: this});

        // Phaser ScaleManager вместо window.addEventListener: сам очищается и синхронизирован с игрой
        this.scale.on(Phaser.Scale.Events.RESIZE, this.onResize, this);
        this.events.once('shutdown', () => {
            this.scale.off(Phaser.Scale.Events.RESIZE, this.onResize, this);
        });
    }

    onResize() {
        this.events.emit(UPDATE_MOBILE_CONTROLS_EVENT_NAME);
    }
}
