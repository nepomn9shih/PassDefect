import type {PlayerParams} from "../types/player";

export const PLAYER_LEVEL_PARAMS: Record<number, PlayerParams> = {
    [1]: {
        maxHealth: 5,
        maxArmor: 1,
        maxBolts: 6,
        // +2
        levelUp: 2
    },
    [2]: {
        // +1
        maxHealth: 6,
        maxArmor: 1,
        maxBolts: 6,
        // +4
        levelUp: 6
    },
    [3]: {
        maxHealth: 6,
        maxArmor: 1,
        // +2
        maxBolts: 8,
        // +6
        levelUp: 12
    },
    [4]: {
        maxHealth: 6,
        // +1
        maxArmor: 2,
        maxBolts: 8,
        // + 8
        levelUp: 20
    },
    [5]: {
        // +1
        maxHealth: 7,
        maxArmor: 2,
        maxBolts: 8,
        // + 10
        levelUp: 30
    },
    [6]: {
        maxHealth: 7,
        // +1
        maxArmor: 3,
        maxBolts: 8,
        // +12
        levelUp: 42
    },
    [7]: {
        maxHealth: 7,
        maxArmor: 3,
        // +2
        maxBolts: 10,
        // + 14
        levelUp: 56
    },
    [8]: {
        // +1
        maxHealth: 8,
        maxArmor: 3,
        maxBolts: 10,
        // +16
        levelUp: 72
    },
    [9]: {  
        maxHealth: 8,
        maxArmor: 3,
        // +2
        maxBolts: 12,
        // +18
        levelUp: 90
    },
    [10]: {
        // +1
        maxHealth: 9,
        maxArmor: 3,
        maxBolts: 12,
        // +20
        levelUp: 110
    }
};
