import {MonstersVariations} from '../../enums';
import {MonsterModelProps} from './types';
import {v4 as generateUUIDv4} from 'uuid';

export class MonsterModel {
    id: string;
    x: number;
    y: number;
    gold: number;
    spawnerId: string;
    type: MonstersVariations;
    health: number;
    maxHealth: number;
    attack: number;

    constructor({x, y, gold, spawnerId, type, health, attack}: MonsterModelProps) {
        this.id = `${spawnerId}-${generateUUIDv4()}`;
        this.x = x;
        this.y = y;
        this.spawnerId = spawnerId;
        this.gold = gold;
        this.type = type;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
    }
}
