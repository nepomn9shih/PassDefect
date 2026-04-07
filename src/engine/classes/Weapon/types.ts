import {MoveDirections, WeaponBoltsVariations, WeaponVariations} from '../../enums';
import {MainScene} from '../../scenes/MainScene';
import type { MonsterContainer } from '../MonsterModel/MonsterContainer';
import type {PlayerContainer} from '../Player/PlayerContainer';

export type WeaponContainerProps = {
	scene: MainScene;
	x: number;
	y: number;
	weaponVariation: WeaponVariations;
	owner: PlayerContainer | MonsterContainer;
};

export type WeaponProps = {
	scene: MainScene;
	x: number;
	y: number;
    variation: WeaponVariations;
	frame?: string;
	direction: MoveDirections;
};

export type WeaponBoltProps = {
	scene: MainScene;
	x: number;
	y: number;
    variation: WeaponBoltsVariations;
	frame?: string;
	direction: MoveDirections;
	damage: number;
};

export type WeaponData = {
	damage: number;
    shotCost: number;
	attackTime: number;
	distance: number;
}
