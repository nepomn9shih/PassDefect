import { PlayerDirections, WeaponVariations } from "../../enums";
import { SimpleCoordinates } from "../../types";

export const PLAYER_INITIAL_SCALE = 0.5;

export const WEAPON_INITIAL_SCALE = 0.8;

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
    [WeaponVariations.GUN]: {
        [PlayerDirections.RIGHT]: {x: 0, y: 0},
        [PlayerDirections.LEFT]: {x: 0, y: 0},
        [PlayerDirections.UP]: {x: 0, y: 0},
        [PlayerDirections.DOWN]: {x: 0, y: 0}
     },
    [WeaponVariations.RIFLE]: {
        [PlayerDirections.RIGHT]: {x: 0, y: 0},
        [PlayerDirections.LEFT]: {x: 0, y: 0},
        [PlayerDirections.UP]: {x: 0, y: 0},
        [PlayerDirections.DOWN]: {x: 0, y: 0}
     },
    [WeaponVariations.SWORD]: {
        [PlayerDirections.RIGHT]: {x: 0, y: 0},
        [PlayerDirections.LEFT]: {x: 0, y: 0},
        [PlayerDirections.UP]: {x: 0, y: 0},
        [PlayerDirections.DOWN]: {x: 0, y: 0}
     },
}