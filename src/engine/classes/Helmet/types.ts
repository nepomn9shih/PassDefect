import {HelmetsVariations} from '../../enums';
import {MainScene} from '../../scenes/MainScene';
import type {PlayerContainer} from '../Player/PlayerContainer';

export type HelmetProps = {
	scene: MainScene;
	x: number;
	y: number;
    variation: HelmetsVariations;
	frame?: string;
	owner: PlayerContainer;
};
