import {ChestVariations} from "../../enums";
import {ChestModelProps} from "./types";
import {v4 as generateUUIDv4} from "uuid";

export class ChestModel {
	x: number;
	y: number;
	id: string;
	spawnerId: string;
	variation: ChestVariations;
	gold: number;
	hearts: number;
	bolts: number;
	armor: number;

	constructor({x, y, spawnerId, variation, gold, hearts, bolts, armor}: ChestModelProps) {
		this.id = `${spawnerId}-${generateUUIDv4()}`;
		this.spawnerId = spawnerId;
		this.x = x;
		this.y = y;
		this.gold = gold;
		this.hearts = hearts;
		this.bolts = bolts;
		this.armor = armor;
		this.variation = variation;
	}   
}