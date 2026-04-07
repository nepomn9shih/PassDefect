import {MoveDirections, WeaponBoltsVariations, WeaponVariations} from "../../enums";
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
        attackTime: 150,
        distance: 100
    },
    [WeaponVariations.SWORD]: {
        damage: 1,
        shotCost: 0,
        attackTime: 200,
        distance: 70
    }
};

export const WEAPON_OFFSET: Record<
    WeaponVariations,
    Record<MoveDirections, SimpleCoordinates>
> = {
    [WeaponVariations.FLAME_GUN]: {
       [MoveDirections.RIGHT]: {x: 4, y: 2},
       [MoveDirections.LEFT]: {x: -4, y: 2},
       [MoveDirections.RIGHT_UP]: {x: 16, y: 0},
       [MoveDirections.LEFT_UP]: {x: -16, y: 0},
       [MoveDirections.RIGHT_DOWN]: {x: 14, y: 0},
       [MoveDirections.LEFT_DOWN]: {x: -14, y: 0}
    },
    [WeaponVariations.SWORD]: {
        [MoveDirections.RIGHT]: {x: 14, y: -10},
        [MoveDirections.LEFT]: {x: -14, y: -10},
        [MoveDirections.RIGHT_UP]: {x: 0, y: 4},
        [MoveDirections.LEFT_UP]: {x: 0, y: 4},
        [MoveDirections.RIGHT_DOWN]: {x: 2, y: 6},
        [MoveDirections.LEFT_DOWN]: {x: -2, y: 6}
     },
}

export const WEAPON_BOLTS_OFFSET: Record<
    WeaponBoltsVariations,
    Record<MoveDirections, SimpleCoordinates>
> = {
    [WeaponBoltsVariations.FLAME_BOLT]: {
       [MoveDirections.RIGHT]: {x: 45, y: 0},
       [MoveDirections.LEFT]: {x: -45, y: 0},
       [MoveDirections.RIGHT_UP]: {x: 14, y: -40},
       [MoveDirections.LEFT_UP]: {x: -14, y: -40},
       [MoveDirections.RIGHT_DOWN]: {x: 16, y: 40},
       [MoveDirections.LEFT_DOWN]: {x: -16, y: 40}
    },
     [WeaponBoltsVariations.SWORD_BOLT]: {
       [MoveDirections.RIGHT]: {x: 30, y: -8},
       [MoveDirections.LEFT]: {x: -30, y: -8},
       [MoveDirections.RIGHT_UP]: {x: 2, y: -12},
       [MoveDirections.LEFT_UP]: {x: -2, y: -12},
       [MoveDirections.RIGHT_DOWN]: {x: 0, y: 22},
       [MoveDirections.LEFT_DOWN]: {x: 0, y: 22}
    }
};

export const WEAPON_BOLTS_FOR_WEAPON: Record<
    WeaponVariations,
    WeaponBoltsVariations
> = {
    [WeaponVariations.FLAME_GUN]: WeaponBoltsVariations.FLAME_BOLT,
    [WeaponVariations.SWORD]: WeaponBoltsVariations.SWORD_BOLT,
};