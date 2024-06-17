import {DEFAULT_POSITION} from "../../constants";
import {SpawnObjects} from "../../enums";
import {getRandomNumber} from "../../utils/getRandomNumber";
import {ChestModel} from "../ChestModel";
import {SpawnerProps} from "./types";

export class Spawner {
    id: string;
    spawnInterval: number;
    limit: number;
    objectType: SpawnObjects;
    spawnLocations: (number | undefined)[][];
    addObject: any;
    deleteObject: any;
    objectsCreated: any[];
    interval: NodeJS.Timeout;

    constructor({config, spawnLocations, addObject, deleteObject}: SpawnerProps) {
        this.id = config.id;
        this.spawnInterval = config.spawnInterval;
        this.limit = config.limit;
        this.objectType = config.spawnerType;
        this.spawnLocations = spawnLocations;
        this.addObject = addObject;
        this.deleteObject = deleteObject;
        this.objectsCreated = [];

        this.start();
    }

    start() {
        this.interval = setInterval(() => {
            if (this.objectsCreated.length < this.limit) {
                this.spawnObject();
            }
        }, this.spawnInterval);
    }

    spawnObject() {
        if (this.objectType === SpawnObjects.CHEST) {
            this.spawnChest();
        }
    }

    spawnChest() {
        const location = this.pickRandomLocation();

        const chest = new ChestModel({
            x: location[0] || DEFAULT_POSITION.x,
            y: location[1] || DEFAULT_POSITION.x,
            gold: getRandomNumber(10, 20),
            spawnerId: this.id
        });

        this.objectsCreated.push(chest);
        this.addObject(chest.id, chest);
    }

    pickRandomLocation(): (number | undefined)[] {
        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];

        // const invalidLocation = this.objectsCreated.some((obj) => {
        //     if (obj.x === location[0] && obj.y === location[1]) {
        //         return true;
        //     }
        //     return false;
        // });

        // if (invalidLocation) {
        //     return this.pickRandomLocation();
        // }

        return location;
    }

    removeObject(id: string) {
        this.objectsCreated = this.objectsCreated.filter(obj => obj.id !== id);
        this.deleteObject(id);
    }
}
   