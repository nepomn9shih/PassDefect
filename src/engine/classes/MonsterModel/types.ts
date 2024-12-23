import {MonstersVariations} from '../../enums';
import {MainScene} from '../../scenes';

export type MonsterModelProps = {
    x: number;
    y: number;
    gold: number;
    spawnerId: string;
    variation: MonstersVariations;
    health: number;
    attack: {
        min: number;
        max: number;
    },
    
}

export type MonsterParams = Pick<MonsterModelProps, 'health' | 'attack'>

export type MonsterProps = Pick<MonsterModelProps, 'x' | 'y' | 'variation' | 'health'> & {
    scene: MainScene;
    id: string;
    maxHealth: number;
};
