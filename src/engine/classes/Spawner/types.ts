import {SpawnObjects} from "../../enums";

export type SpawnerProps = {
	config: {
		spawnInterval: number;
		limit: number;
		spawnerType: SpawnObjects,
		id: string;
	}
	spawnLocations: (number | undefined)[][];
	addObject: () => void;
	deleteObject: () => void;
};