import {MonstersVariations} from '../../enums';
import { MainScene } from '../../scenes';

export type MonsterModelProps = {
    x: number;
    y: number;
    gold: number;
    spawnerId: string;
    type: MonstersVariations;
    health: number;
    attack: number;
}

export type MonsterParams = Pick<MonsterModelProps, 'health' | 'attack'>

export type MonsterProps = Pick<MonsterModelProps, 'x' | 'y' | 'type' | 'health'> & {
    scene: MainScene;
    id: string;
    maxHealth: number;
};
