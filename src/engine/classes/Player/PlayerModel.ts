import {v4 as generateUUIDv4} from 'uuid';
import {PLAYER_LEVEL_PARAMS} from '../../constants/player';

export class PlayerModel {
    id: string;
    level: number;
    health: number;
    maxHealth: number;
    gold: number;
    bolts: number;
	maxBolts: number;
	armor: number;
	maxArmor: number;
    sculls: number;
    spawnLocations: (number)[][];
    x: number;
    y: number;

    constructor(spawnLocations: (number)[][]) {
        this.level = 1;
        this.health = PLAYER_LEVEL_PARAMS[this.level].maxHealth;
        this.maxHealth = PLAYER_LEVEL_PARAMS[this.level].maxHealth;
        this.gold = 0;
        this.bolts = PLAYER_LEVEL_PARAMS[this.level].maxBolts;
        this.maxBolts = PLAYER_LEVEL_PARAMS[this.level].maxBolts;
        this.armor = 0;
        this.maxArmor = PLAYER_LEVEL_PARAMS[this.level].maxArmor;
        this.sculls = 0;
        this.id = `player-${generateUUIDv4()}`;
        this.spawnLocations = spawnLocations;

        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
        [this.x, this.y] = location;
    };

    respawn() {
        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
        [this.x, this.y] = location;
    }
};
