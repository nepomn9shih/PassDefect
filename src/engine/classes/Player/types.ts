import {PlayerSkinVariations} from '../../enums';
import {MainScene} from '../../scenes/MainScene';

export type PlayerProps = {
	scene: MainScene;
	x: number;
	y: number;
    skin: PlayerSkinVariations
};