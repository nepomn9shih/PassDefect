import {ButtonVariations} from "../../enums";
import type {SimpleCoordinates} from "../../types";

export const BUTTON_INITIAL_SCALE = 0.5;

export const BUTTON_OFFSETS: Record<ButtonVariations, SimpleCoordinates> = {
    [ButtonVariations.UP]: {
        x: 230,
        y: -320
    },
    [ButtonVariations.DOWN]: {
        x: 230,
        y: -100
    },
    [ButtonVariations.LEFT]: {
        x: 100,
        y: -210
    },
    [ButtonVariations.RIGHT]: {
        x: 360,
        y: -210
    },
    [ButtonVariations.ATTACK]: {
        x: -200,
        y: -180
    }
};
