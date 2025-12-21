import {PlayerDirections, WeaponVariations} from "../../enums";
import type {SimpleCoordinates} from "../../types";
import type {WeaponData} from "./types";

export const PLAYER_INITIAL_SCALE = 0.5;

export const WEAPON_INITIAL_SCALE = 0.8;

export const WEAPONS_CONFIG: Record<WeaponVariations, WeaponData> = {
    [WeaponVariations.FLAME_GUN]: {
        damage: 2,
        shotCost: 1
    },
    [WeaponVariations.SWORD]: {
        damage: 1,
        shotCost: 0
    }
};

export const WEAPON_OFFSET: Record<
    WeaponVariations,
    Record<PlayerDirections, SimpleCoordinates>
> = {
    [WeaponVariations.FLAME_GUN]: {
       [PlayerDirections.RIGHT]: {x: 30, y: 0},
       [PlayerDirections.LEFT]: {x: -30, y: 0},
       [PlayerDirections.UP]: {x: 0, y: -30},
       [PlayerDirections.DOWN]: {x: 0, y: 30}
    },
    [WeaponVariations.SWORD]: {
        [PlayerDirections.RIGHT]: {x: 0, y: 0},
        [PlayerDirections.LEFT]: {x: 0, y: 0},
        [PlayerDirections.UP]: {x: 0, y: 0},
        [PlayerDirections.DOWN]: {x: 0, y: 0}
     },
}