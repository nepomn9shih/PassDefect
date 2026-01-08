import type {PlayerParams} from "../types/player";

export const PLAYER_LEVEL_PARAMS: Record<number, PlayerParams> = {
    [1]: {
        maxHealth: 5,
        maxArmor: 1,
        maxBolts: 6,
        velocity: 100,
        levelUp: 2
    },
    [2]: {
        // +1
        maxHealth: 6,
        maxArmor: 1,
        maxBolts: 6,
        // +5
        velocity: 105,
        // +4
        levelUp: 6
    },
    [3]: {
        maxHealth: 6,
        maxArmor: 1,
        // +2
        maxBolts: 8,
        // +5
        velocity: 110,
        // +6
        levelUp: 12
    },
    [4]: {
        maxHealth: 6,
        // +1
        maxArmor: 2,
        maxBolts: 8,
        // +5
        velocity: 115,
        // + 8
        levelUp: 20
    },
    [5]: {
        // +1
        maxHealth: 7,
        maxArmor: 2,
        maxBolts: 8,
        // +5
        velocity: 120,
        // + 10
        levelUp: 30
    },
    [6]: {
        maxHealth: 7,
        // +1
        maxArmor: 3,
        maxBolts: 8,
        // +5
        velocity: 125,
        // +12
        levelUp: 42
    },
    [7]: {
        maxHealth: 7,
        maxArmor: 3,
        // +2
        maxBolts: 10,
        // +5
        velocity: 130,
        // + 14
        levelUp: 56
    },
    [8]: {
        // +1
        maxHealth: 8,
        maxArmor: 3,
        maxBolts: 10,
        // +5
        velocity: 135,
        // +16
        levelUp: 72
    },
    [9]: {  
        maxHealth: 8,
        maxArmor: 3,
        // +2
        maxBolts: 12,
        // +5
        velocity: 140,
        // +18
        levelUp: 90
    },
    [10]: {
        // +1
        maxHealth: 9,
        maxArmor: 3,
        maxBolts: 12,
        // +5
        velocity: 145,
        // +20
        levelUp: 110
    },
    [11]: {
        maxHealth: 9,
        maxArmor: 3,
        // +2
        maxBolts: 14,
        // +5
        velocity: 150,
        // +22
        levelUp: 132
    },
    [12]: {
        // +1
        maxHealth: 10,
        maxArmor: 3,
        maxBolts: 14,
        // +5
        velocity: 155,
        // +24
        levelUp: 156
    },
    [13]: {
        maxHealth: 10,
        maxArmor: 3,
        // +2
        maxBolts: 16,
        // +5
        velocity: 160,
        // +26
        levelUp: 182
    },
    [14]: {
        // +1
        maxHealth: 11,
        maxArmor: 3,
        maxBolts: 16,
        // +5
        velocity: 165,
        // +28
        levelUp: 210
    },
    [15]: {
        maxHealth: 11,
        maxArmor: 3,
        // +2
        maxBolts: 18,
        // +5
        velocity: 170,
        // +30
        levelUp: 240
    }
};
