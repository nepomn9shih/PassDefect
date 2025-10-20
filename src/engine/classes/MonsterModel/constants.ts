import {MonstersVariations} from '../../enums';
import {MonsterParams} from './types';

export const MONSTERS_PARAMS: Record<MonstersVariations, MonsterParams> = {
    [MonstersVariations.KNIGHT]: {
        health: 5,
        attack: {
            min: 1,
            max: 2
        },
        sight: 300,
        speed: 40
    }
};

export const HEALTH_BAR_CONFIG = {
    width: 46,
    height: 5
};

export const MONSTER_STEP = 32;

export const MONSTER_INITIAL_SCALE = 0.5;