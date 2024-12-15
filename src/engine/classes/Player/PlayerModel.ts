import {v4 as generateUUIDv4} from 'uuid';

export class PlayerModel {
    health: number;
    maxHealth: number;
    gold: number;
    id: string;
    spawnLocations: (number)[][];
    x: number;
    y: number;

    constructor(spawnLocations: (number)[][]) {
        this.health = 10;
        this.maxHealth = 10;
        this.gold = 0;
        this.id = `player-${generateUUIDv4()}`;
        this.spawnLocations = spawnLocations;

        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
        [this.x, this.y] = location;
    };

    updateGold(gold: number) {
        this.gold += gold;
    }

    respawn() {
        this.health = this.maxHealth;
        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
        [this.x, this.y] = location;
    }
};
