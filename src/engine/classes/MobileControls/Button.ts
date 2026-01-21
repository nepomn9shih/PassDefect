import {UPDATE_MOBILE_CONTROLS_EVENT_NAME} from "../../constants/events";
import {AtlasesKeys, ButtonVariations, GameEvents, WeaponVariations} from "../../enums";
import type {ControlsScene} from "../../scenes/ControlsScene";
import { WEAPONS_CONFIG } from "../Weapon/constants";
import {BUTTON_INITIAL_SCALE} from "./constants";
import {getButtonCoordinates} from "./getButtonCoordinates";
import type {ButtonProps} from "./types";

export class Button extends Phaser.Physics.Arcade.Sprite {
    scene: ControlsScene;
    x: number;
    y: number;
    variation: ButtonVariations;
    initialScale: number;

    constructor({
        scene,
        variation
    }: ButtonProps) {
        super(
            scene,
            0,
            0,
            AtlasesKeys.CONTROLS,
            variation
        );
        this.scene = scene;
        this.variation = variation;
        this.x = getButtonCoordinates(this.variation, this.scene.cameras.main.width, this.scene.cameras.main.height).x;
        this.y = getButtonCoordinates(this.variation, this.scene.cameras.main.width, this.scene.cameras.main.height).y;
        this.initialScale = variation === ButtonVariations.ATTACK
            ? 1.6 * BUTTON_INITIAL_SCALE
            : BUTTON_INITIAL_SCALE

        // Настраиваем размер
        this.setScale(this.initialScale);
        this.alpha = this.scene.store.getState().game.isTouchDevice ? 1 : 0;
        // Закрепляет координаты относительно вьюпорта
        this.setScrollFactor(0, 0);
        this.setInteractive({cursor: 'pointer'});
        
        this.on('pointerdown', this.pointerDownHandler, this);
        this.on('pointerup', this.pointerUpHandler, this);
        this.on('pointerout', this.pointerUpHandler, this);
        this.scene.events.on(UPDATE_MOBILE_CONTROLS_EVENT_NAME, this.updateXY, this);
    }

    pointerDownHandler() {
        this.scene.events.emit(GameEvents.MOBILE_BUTTON_DOWN, this.variation);
        this.setScale(0.9 * this.initialScale);
        // Чтобы при зажатой кнопке атаки оружие не было всегда в стадии удара
        if (this.variation === ButtonVariations.ATTACK) {
            this.scene.time.delayedCall(WEAPONS_CONFIG[WeaponVariations.SWORD].attackTime, () => {
				this.scene.events.emit(GameEvents.MOBILE_BUTTON_UP, this.variation);
			}, [], this);
        }
    }

    pointerUpHandler() {
        this.scene.events.emit(GameEvents.MOBILE_BUTTON_UP, this.variation);
        this.setScale(this.initialScale);
    }

    updateXY() {
        this.x = getButtonCoordinates(this.variation, this.scene.cameras.main.width, this.scene.cameras.main.height).x;
        this.y = getButtonCoordinates(this.variation, this.scene.cameras.main.width, this.scene.cameras.main.height).y;
    }
}