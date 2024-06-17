import {ChestModelProps} from "./types";
import {v4 as generateUUIDv4} from "uuid";

export class ChestModel {
	x: number;
	y: number;
	gold: number;
	id: string;
	spawnerId: string;

	constructor({x, y, gold, spawnerId}: ChestModelProps) {
		this.id = `${spawnerId}-${generateUUIDv4()}`;
		this.spawnerId = spawnerId;
		this.x = x;
		this.y = y;
		this.gold = gold;
	}   
}