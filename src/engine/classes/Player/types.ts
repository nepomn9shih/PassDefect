import {PlayerSkinVariations} from '../../enums';
import {MainScene} from '../../scenes/MainScene';
import type {PlayerModel} from './PlayerModel';

export type PlayerProps = {
	scene: MainScene;
	x: number;
	y: number;
    skin: PlayerSkinVariations;
	frame?: string;
};

export type PlayerContainerProps = Pick<PlayerProps, 'scene' | 'skin'> & {
	frame?: string;
	playerObject: PlayerModel;
};
