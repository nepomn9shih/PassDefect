import {ChestVariations} from "../../enums";
import {MainScene} from "../../scenes";

export type ChestModelProps = {
	x: number;
	y: number;
	spawnerId: string;
	variation: ChestVariations;
	gold: number;
	hearts: number;
	bolts: number;
	armor: number;
};

export type ChestProps = {
	scene: MainScene;
	id: string;
	variation: ChestVariations;
	x: number;
	y: number;
	key: string;
	coins: number;
	hearts: number;
	bolts: number;
	armor: number;
}