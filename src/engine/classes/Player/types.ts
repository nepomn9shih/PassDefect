import {PlayerSkinVariations} from '../../enums';
import {MainScene} from '../../scenes/MainScene';

export type PlayerProps = {
	scene: MainScene;
	x: number;
	y: number;
    skin: PlayerSkinVariations;
	frame?: string;
};

export type PlayerContainerProps = PlayerProps & {
	health: number;
	gold: number;
    maxHealth: number;
	bolts: number;
	maxBolts: number;
	armor: number;
	maxArmor: number;
	sculls: number;
    id: string;
};
