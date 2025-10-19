import {MonstersVariations} from '../../enums';
import {MonsterParams} from './types';

export const MONSTERS_PARAMS: Record<MonstersVariations, MonsterParams> = {
    [MonstersVariations.KNIGHT]: {
        health: 5,
        attack: {
            min: 1,
            max: 2
        },
        sight: 50
    }
};

export const HEALTH_BAR_CONFIG = {
    width: 64,
    height: 5
};

export const MONSTER_STEP = 32;

export const MONSTER_SPEED = 40;