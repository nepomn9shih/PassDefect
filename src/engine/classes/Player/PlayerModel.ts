import {v4 as generateUUIDv4} from 'uuid';

export class PlayerModel {
    id: string;
    health: number;
    maxHealth: number;
    gold: number;
    bolts: number;
	maxBolts: number;
	armor: number;
	maxArmor: number;
    spawnLocations: (number)[][];
    x: number;
    y: number;

    constructor(spawnLocations: (number)[][]) {
        this.health = 10;
        this.maxHealth = 10;
        this.gold = 0;
        this.bolts = 10;
        this.maxBolts = 10;
        this.armor = 0;
        this.maxArmor = 3;
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
