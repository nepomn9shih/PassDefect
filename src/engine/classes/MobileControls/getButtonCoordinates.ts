import type {SimpleCoordinates} from '../../types';
import {ButtonVariations} from './../../enums/index';
import {BUTTON_OFFSETS} from './constants';

export const getButtonCoordinates = (
    variation: ButtonVariations,
    screenWidth: number,
    screenHeight: number
): SimpleCoordinates => {
    if (variation === ButtonVariations.ATTACK) {
        return {
            x: screenWidth + BUTTON_OFFSETS[variation].x,
            y: screenHeight + BUTTON_OFFSETS[variation].y
        }
    }

    // Кнопка паузы закреплена в правом верхнем углу экрана
    if (variation === ButtonVariations.PAUSE) {
        return {
            x: screenWidth + BUTTON_OFFSETS[variation].x,
            y: BUTTON_OFFSETS[variation].y
        }
    }

    return {
            x: BUTTON_OFFSETS[variation].x,
            y: screenHeight + BUTTON_OFFSETS[variation].y
        }
}