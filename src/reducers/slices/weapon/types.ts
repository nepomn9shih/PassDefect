import {WeaponVariations} from "../../../engine/enums";

export type WeaponState = {
    weapons: Record<WeaponVariations, WeaponData>;
}
export type WeaponData = {
    enabled: boolean;
    charges: number;
};