import {PlayerDirections, WeaponBoltsVariations, WeaponVariations} from '../../enums';
import {MainScene} from '../../scenes/MainScene';
import type {PlayerContainer} from '../Player/PlayerContainer';

export type WeaponContainerProps = {
	scene: MainScene;
	x: number;
	y: number;
	weaponVariation: WeaponVariations;
	owner: PlayerContainer;
};

export type WeaponProps = {
	scene: MainScene;
	x: number;
	y: number;
    variation: WeaponVariations;
	frame?: string;
	direction: PlayerDirections;
};

export type WeaponBoltProps = {
	scene: MainScene;
	x: number;
	y: number;
    variation: WeaponBoltsVariations;
	frame?: string;
	direction: PlayerDirections;
	damage: number;
};

export type WeaponData = {
	damage: number;
    shotCost: number;
	attackTime: number;
}
