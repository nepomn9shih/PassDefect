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

    return {
            x: BUTTON_OFFSETS[variation].x,
            y: screenHeight + BUTTON_OFFSETS[variation].y
        }
}