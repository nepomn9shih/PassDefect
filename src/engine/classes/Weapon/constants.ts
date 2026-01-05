import {PlayerDirections, WeaponBoltsVariations, WeaponVariations} from "../../enums";
import type {SimpleCoordinates} from "../../types";
import type {WeaponData} from "./types";

export const WEAPON_INITIAL_SCALE = 0.7;

export const WEAPON_BOLTS_INITIAL_SCALE = 0.8;

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
       [PlayerDirections.UP]: {x: -12, y: 0},
       [PlayerDirections.DOWN]: {x: 12, y: 0}
    },
    [WeaponVariations.SWORD]: {
        [PlayerDirections.RIGHT]: {x: 0, y: 0},
        [PlayerDirections.LEFT]: {x: 0, y: 0},
        [PlayerDirections.UP]: {x: 0, y: 0},
        [PlayerDirections.DOWN]: {x: 0, y: 0}
     },
}

export const WEAPON_BOLTS_OFFSET: Record<
    WeaponBoltsVariations,
    Record<PlayerDirections, SimpleCoordinates>
> = {
    [WeaponBoltsVariations.FLAME_BOLT]: {
       [PlayerDirections.RIGHT]: {x: 45, y: 0},
       [PlayerDirections.LEFT]: {x: -45, y: 0},
       [PlayerDirections.UP]: {x: -12, y: -40},
       [PlayerDirections.DOWN]: {x: 12, y: 40}
    },
     [WeaponBoltsVariations.SWORD_BOLT]: {
       [PlayerDirections.RIGHT]: {x: 30, y: 0},
       [PlayerDirections.LEFT]: {x: -30, y: 0},
       [PlayerDirections.UP]: {x: 0, y: -30},
       [PlayerDirections.DOWN]: {x: 0, y: 30}
    }
};

export const WEAPON_BOLTS_FOR_WEAPON: Record<
    WeaponVariations,
    WeaponBoltsVariations
> = {
    [WeaponVariations.FLAME_GUN]: WeaponBoltsVariations.FLAME_BOLT,
    [WeaponVariations.SWORD]: WeaponBoltsVariations.SWORD_BOLT,
};