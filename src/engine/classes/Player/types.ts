import {PlayerDirections, PlayerSkinVariations, WeaponVariations} from '../../enums';
import {MainScene} from '../../scenes/MainScene';

export type WeaponProps = {
	scene: MainScene;
	x: number;
	y: number;
    variation: WeaponVariations;
	frame?: string;
	direction: PlayerDirections;
};

export type PlayerProps = {
	scene: MainScene;
	x: number;
	y: number;
    skin: PlayerSkinVariations;
	frame?: string;
};

export type PlayerContainerProps = PlayerProps & {
	health: number;
    maxHealth: number;
    id: string;
};
