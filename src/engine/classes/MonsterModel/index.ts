import {MonstersVariations} from '../../enums';
import {getRandomNumber} from '../../utils/getRandomNumber';
import {MONSTER_STEP} from './constants';
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

    move() {
        const randomPosition = getRandomNumber(1, 8);

        switch (randomPosition) {
            case 1:
                this.x += MONSTER_STEP;
                break;
            case 2:
                this.x -= MONSTER_STEP;
                break;
            case 3:
                this.y += MONSTER_STEP;
                break;
            case 4:
                this.y -= MONSTER_STEP;
                break;
            case 5:
                this.x += MONSTER_STEP;
                this.y += MONSTER_STEP;
                break;
            case 6:
                this.x += MONSTER_STEP;
                this.y -= MONSTER_STEP;
                break;
            case 7:
                this.x -= MONSTER_STEP;
                this.y += MONSTER_STEP;
                break;
            case 8:
                this.x -= MONSTER_STEP;
                this.y -= MONSTER_STEP;
                break;
            default:
                break;
        }
    }       
}
