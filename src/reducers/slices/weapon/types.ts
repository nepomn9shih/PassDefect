import {WeaponVariations} from "../../../engine/enums";

export type WeaponState = {
    weapons: Record<WeaponVariations, boolean>;
    active: WeaponVariations
}
