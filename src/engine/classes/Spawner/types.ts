import {SpawnObjects} from '../../enums';
import {ChestModel} from '../ChestModel';
import {MonsterModel} from '../MonsterModel';

export type SpawnerProps = {
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