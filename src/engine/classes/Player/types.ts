import {PlayerSkinVariations} from '../../enums';
import {MainScene} from '../../scenes/MainScene';

export type PlayerContainerProps = {
	scene: MainScene;
	x: number;
	y: number;
    skin: PlayerSkinVariations;
	frame?: string;
};

export type PlayerProps = PlayerContainerProps;