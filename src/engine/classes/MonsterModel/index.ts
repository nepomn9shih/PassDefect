import {MonstersVariations} from '../../enums';
import {MonsterModelProps} from './types';
import {v4 as generateUUIDv4} from 'uuid';

export class MonsterModel {
    id: string;
    x: number;
    y: number;
    gold: number;
    spawnerId: string;
    variation: MonstersVariations;
    health: number;
    maxHealth: number;
    attack: {
        min: number;
        max: number;
    }

    constructor({x, y, gold, spawnerId, variation, health, attack}: MonsterModelProps) {
        this.id = `${spawnerId}-${generateUUIDv4()}`;
        this.x = x;
        this.y = y;
        this.spawnerId = spawnerId;
        this.gold = gold;
        this.variation = variation;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
    }
}
