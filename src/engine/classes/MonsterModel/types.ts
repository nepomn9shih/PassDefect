import {MonstersVariations, WeaponVariations} from '../../enums';
import {MainScene} from '../../scenes';
import type {MonsterModel} from './index';

export type MonsterModelProps = {
    x: number;
    y: number;
    gold: number;
    sculls: number;
    spawnerId: string;
    variation: MonstersVariations;
    health: number;
    attack: {
        min: number;
        max: number;
    },
    sight: number;
    speed: number;
    weaponVariation: WeaponVariations;
}

export type MonsterParams = Pick<
    MonsterModelProps,
    'health' | 'attack' | 'sight' | 'speed' | 'sculls' | 'weaponVariation'
> & {
    minGold: number;
    maxGold: number;
}

export type MonsterContainerProps = {
    scene: MainScene;
    monsterObject: MonsterModel;
};

export type MonsterProps = {
    scene: MainScene;
    x: number;
    y: number;
    variation: MonstersVariations;
    frame?: string;
};
