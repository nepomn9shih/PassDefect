import {Scene} from "phaser";
import {MobileControls} from "../classes/MobileControls/MobileControls";
import {ButtonVariations, GameEvents, SceneNames} from "../enums";
import type {GameStore} from "../types";
import {UPDATE_MOBILE_CONTROLS_EVENT_NAME} from "../constants/events";
import {ESC_KEY_EVENT} from "../constants/events";
import {setPaused} from "../../reducers/slices";

export class ControlsScene extends Scene {
    store: GameStore;
    mobileControls!: MobileControls;

    constructor(store: GameStore) {
        super(SceneNames.CONTROLS);
        this.store = store;
    }

    create() {
        this.mobileControls = new MobileControls({scene: this});

        // Кнопка паузы на мобилке приходит как обычная мобильная кнопка
        this.events.on(GameEvents.MOBILE_BUTTON_DOWN, this.onMobileButtonDown, this);
        // Сцена остаётся активной во время паузы: её клавиатура слушает ESC и снимает паузу
        this.input.keyboard?.on(ESC_KEY_EVENT, this.onEscKeyDown, this);
        // Phaser ScaleManager вместо window.addEventListener: сам очищается и синхронизирован с игрой
        this.scale.on(Phaser.Scale.Events.RESIZE, this.onResize, this);
        this.events.once('shutdown', () => {
            this.events.off(GameEvents.MOBILE_BUTTON_DOWN, this.onMobileButtonDown, this);
            this.input.keyboard?.off(ESC_KEY_EVENT, this.onEscKeyDown, this);
            this.scale.off(Phaser.Scale.Events.RESIZE, this.onResize, this);
        });
    }

    onMobileButtonDown(buttonVariation: ButtonVariations) {
        if (buttonVariation === ButtonVariations.PAUSE) {
            this.togglePause();
        }
    }

    onEscKeyDown() {
        this.togglePause();
    }

    togglePause() {
        const {isPaused, isGameOver} = this.store.getState().game;

        // На экране гейм-овера пауза недоступна: остаётся только «Заново»
        if (isGameOver) {
            return;
        }

        // Паузу применяет подписка MainScene на стейт
        this.store.dispatch(setPaused(!isPaused));
    }

    onResize() {
        this.events.emit(UPDATE_MOBILE_CONTROLS_EVENT_NAME);
    }
}
