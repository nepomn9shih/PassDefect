import {MonstersVariations} from '../../enums';
import {MonsterParams} from './types';

export const MONSTERS_PARAMS: Record<MonstersVariations, MonsterParams> = {
    [MonstersVariations.INFECTED]: {
        health: 5,
        attack: {
            min: 1,
            max: 2
        }
    }
};

export const HEALTH_BAR_CONFIG = {
    width: 64,
    height: 5
};
