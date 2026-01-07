import {MonstersVariations} from '../../enums';
import type {MonsterModelProps} from './types';
import {v4 as generateUUIDv4} from 'uuid';

export class MonsterModel {
    id: string;
    x: number;
    y: number;
    gold: number;
    sculls: number;
    spawnerId: string;
    variation: MonstersVariations;
    health: number;
    maxHealth: number;
    attack: {
        min: number;
        max: number;
    }
    sight: number;

    constructor({
        x,
        y,
        gold,
        spawnerId,
        variation,
        health,
        attack,
        sight,
        sculls
    }: MonsterModelProps) {
        this.id = `${spawnerId}-${generateUUIDv4()}`;
        this.x = x;
        this.y = y;
        this.spawnerId = spawnerId;
        this.gold = gold;
        this.variation = variation;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
        this.sight = sight;
        this.sculls = sculls;
    }
};
