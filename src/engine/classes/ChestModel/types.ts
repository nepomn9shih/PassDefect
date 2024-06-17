import {MainScene} from "../../scenes";

export type ChestModelProps = {
	x: number;
	y: number;
	gold: number;
	spawnerId: string;
};

export type ChestProps = {
	scene: MainScene;
	x: number;
	y: number;
	key: string;
	frame: string;
	coins: number;
	id: string;
}