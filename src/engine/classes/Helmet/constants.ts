import {HelmetsVariations, PlayerSkinVariations} from "../../enums";
import type { SimpleCoordinates } from "../../types";

export const HELMET_INITIAL_SCALE = 0.5;

export const HELMETS_FOR_SKIN: Record<
    PlayerSkinVariations,
    HelmetsVariations
> = {
    [PlayerSkinVariations.KNIGHT]: HelmetsVariations.PLAYER_KNIGHT,
};

export const HELMETS_OFFSET: Record<
    HelmetsVariations,
    Record<string, SimpleCoordinates>
> = {
    [HelmetsVariations.PLAYER_KNIGHT]: {
       ['1']: {x: 0, y: -18},
       ['2']: {x: 0, y: -18},
       ['3']: {x: 0, y: -18}
    }
};
