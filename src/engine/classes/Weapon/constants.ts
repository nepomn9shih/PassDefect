import {PlayerDirections, WeaponBoltsVariations, WeaponVariations} from "../../enums";
import type {SimpleCoordinates} from "../../types";
import type {WeaponData} from "./types";

export const WEAPON_INITIAL_SCALE = 0.7;

export const WEAPON_BOLTS_INITIAL_SCALE = 0.7;

export const WEAPON_DEFAULT_FRAME = '01';
export const WEAPON_ATTACK_FRAME = '02';

export const WEAPONS_CONFIG: Record<WeaponVariations, WeaponData> = {
    [WeaponVariations.FLAME_GUN]: {
        damage: 2,
        shotCost: 1,
        attackTime: 150
    },
    [WeaponVariations.SWORD]: {
        damage: 1,
        shotCost: 0,
        attackTime: 150
    }
};

export const WEAPON_OFFSET: Record<
    WeaponVariations,
    Record<PlayerDirections, SimpleCoordinates>
> = {
    [WeaponVariations.FLAME_GUN]: {
       [PlayerDirections.RIGHT]: {x: 4, y: 2},
       [PlayerDirections.LEFT]: {x: -4, y: 2},
       [PlayerDirections.RIGHT_UP]: {x: 16, y: 0},
       [PlayerDirections.LEFT_UP]: {x: -16, y: 0},
       [PlayerDirections.RIGHT_DOWN]: {x: 14, y: 0},
       [PlayerDirections.LEFT_DOWN]: {x: -14, y: 0}
    },
    [WeaponVariations.SWORD]: {
        [PlayerDirections.RIGHT]: {x: 14, y: -10},
        [PlayerDirections.LEFT]: {x: -14, y: -10},
        [PlayerDirections.RIGHT_UP]: {x: 0, y: 4},
        [PlayerDirections.LEFT_UP]: {x: 0, y: 4},
        [PlayerDirections.RIGHT_DOWN]: {x: 2, y: 6},
        [PlayerDirections.LEFT_DOWN]: {x: -2, y: 6}
     },
}

export const WEAPON_BOLTS_OFFSET: Record<
    WeaponBoltsVariations,
    Record<PlayerDirections, SimpleCoordinates>
> = {
    [WeaponBoltsVariations.FLAME_BOLT]: {
       [PlayerDirections.RIGHT]: {x: 45, y: 0},
       [PlayerDirections.LEFT]: {x: -45, y: 0},
       [PlayerDirections.RIGHT_UP]: {x: 14, y: -40},
       [PlayerDirections.LEFT_UP]: {x: -14, y: -40},
       [PlayerDirections.RIGHT_DOWN]: {x: 16, y: 40},
       [PlayerDirections.LEFT_DOWN]: {x: -16, y: 40}
    },
     [WeaponBoltsVariations.SWORD_BOLT]: {
       [PlayerDirections.RIGHT]: {x: 30, y: -8},
       [PlayerDirections.LEFT]: {x: -30, y: -8},
       [PlayerDirections.RIGHT_UP]: {x: 2, y: -12},
       [PlayerDirections.LEFT_UP]: {x: -2, y: -12},
       [PlayerDirections.RIGHT_DOWN]: {x: 0, y: 22},
       [PlayerDirections.LEFT_DOWN]: {x: 0, y: 22}
    }
};

export const WEAPON_BOLTS_FOR_WEAPON: Record<
    WeaponVariations,
    WeaponBoltsVariations
> = {
    [WeaponVariations.FLAME_GUN]: WeaponBoltsVariations.FLAME_BOLT,
    [WeaponVariations.SWORD]: WeaponBoltsVariations.SWORD_BOLT,
};