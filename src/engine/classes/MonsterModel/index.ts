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
    boundX: number;
    boundY: number;
    sight: number;

    constructor({
        x,
        y,
        gold,
        spawnerId,
        variation,
        health,
        attack,
        boundX,
        boundY,
        sight
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
        this.boundX = boundX;
        this.boundY = boundY;
        this.sight = sight;
    }

    moveRight() {
        const newX = this.x + MONSTER_STEP;
        if (newX > 0 && newX < this.boundX) {
            this.x = newX;
        }
    }

    moveLeft() {
        const newX = this.x - MONSTER_STEP;
        if (newX > 0 && newX < this.boundX) {
            this.x = newX;
        }
    }

    moveDown() {
        const newY = this.y + MONSTER_STEP;
        if (newY > 0 && newY < this.boundY) {
            this.y = newY;
        }
    }

    moveTop() {
        const newY = this.y - MONSTER_STEP;
        if (newY > 0 && newY < this.boundY) {
            this.y = newY;
        }
    }

    move() {
        const randomPosition = getRandomNumber(1, 8);

        switch (randomPosition) {
            case 1: {
                this.moveRight();
                break;
            }
            case 2: {
                this.moveLeft();
                break;
            }
            case 3: {
                this.moveDown();
                break;
            }
            case 4: {
                this.moveTop();
                break;
            }
            case 5: {
                this.moveRight();
                this.moveDown();
                break;
            }
            case 6: {
                this.moveRight();
                this.moveTop();
                break;
            }
            case 7: {
                this.moveLeft();
                this.moveDown();
                break;
            }
            case 8: {
                this.moveLeft();
                this.moveTop();
                break;
            }
            default:
                break;
        };
    };      
};
