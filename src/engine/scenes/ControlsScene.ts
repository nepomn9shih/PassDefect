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

        window.addEventListener('resize', () => {
            this.events.emit(UPDATE_MOBILE_CONTROLS_EVENT_NAME);
        });
    }
}
