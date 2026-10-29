import {PLAYER_LEVEL_PARAMS} from "../../../engine/constants/player";

/** Характеристики игрока для отображения в таблице героя */
export const HERO_STATS = [
    {param: 'maxHealth' as const, label: 'Здоровье'},
    {param: 'maxArmor' as const, label: 'Броня'},
    {param: 'maxBolts' as const, label: 'Снаряды'},
    {param: 'velocity' as const, label: 'Скорость'},
];

export const MAX_LEVEL = Object.values(PLAYER_LEVEL_PARAMS).length;