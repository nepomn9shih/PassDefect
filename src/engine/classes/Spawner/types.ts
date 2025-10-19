import {SpawnerImageVariations, SpawnObjects} from '../../enums';
import {MainScene} from '../../scenes';
import {ChestModel} from '../ChestModel';
import {MonsterModel} from '../MonsterModel';

export type SpawnerProps = {
	scene: MainScene;
	config: {
		spawnInterval: number;
		limit: number;
		spawnerType: SpawnObjects,
		id: string;
	}
	spawnLocations: (number | undefined)[][];
	addObject: AddObject;
    deleteObject: (id: string) => void;
	moveObjects: () => void;
};

export type AddObject = (id: string, item: ChestModel | MonsterModel) => void;

export type SpawnerImageProps = {
	scene: MainScene;
	x: number;
	y: number;
	variation: SpawnerImageVariations;
};
