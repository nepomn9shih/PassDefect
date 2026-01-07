import {PLAYER_LEVEL_PARAMS} from "../constants/player";

/** Получить уровень игрока в зависимости от собранных черепов */
export const getPlayerLevel = (sculls: number) => {
    const maxLevel = Object.values(PLAYER_LEVEL_PARAMS).length;

    for (let level = 1; level <= maxLevel; level++) {
        if (sculls < PLAYER_LEVEL_PARAMS[level].levelUp) {
            return level;
        }
    }

    return 1;
};
