import {MapObjectVariations} from '../../enums';
import {MainScene} from '../../scenes';

export type MapObjectProps = {
	scene: MainScene;
	x: number;
	y: number;
	variation: MapObjectVariations;
};
