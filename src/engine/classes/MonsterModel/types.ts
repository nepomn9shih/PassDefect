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
    sight: number;
    speed: number;
}

export type MonsterParams = Pick<MonsterModelProps, 'health' | 'attack' | 'sight' | 'speed'>

export type MonsterContainerProps = Pick<MonsterModelProps, 'x' | 'y' | 'variation' | 'health'> & {
    scene: MainScene;
    id: string;
    maxHealth: number;
};

export type MonsterProps = {
    scene: MainScene;
    x: number;
    y: number;
    variation: MonstersVariations;
    frame?: string;
};
