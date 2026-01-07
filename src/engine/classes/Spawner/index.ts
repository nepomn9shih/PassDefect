import {DEFAULT_POSITION} from "../../constants";
import {SpawnObjects} from "../../enums";
import {MainScene} from "../../scenes";
import {getChestProps} from "../../utils/getChestProps";
import {getRandomMonsterVariation} from "../../utils/getRandomMonsterVariation";
import {getRandomNumber} from "../../utils/getRandomNumber";
import {ChestModel} from "../ChestModel";
import {MonsterModel} from "../MonsterModel";
import {MONSTERS_PARAMS} from "../MonsterModel/constants";
import type {AddObject, SpawnerProps} from "./types";

export class Spawner {
    scene: MainScene;
    id: string;
    spawnInterval: number;
    limit: number;
    objectType: SpawnObjects;
    spawnLocations: (number | undefined)[][];
    addObject: AddObject;
    deleteObject: (id: string) => void;
    objectsCreated: (ChestModel | MonsterModel)[];
    interval?: NodeJS.Timeout;

    constructor({scene, config, spawnLocations, addObject, deleteObject}: SpawnerProps) {
        this.id = config.id;
        this.scene = scene;
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
        } else if (this.objectType === SpawnObjects.MONSTER) {
            this.spawnMonster();
        }
    }

    spawnChest() {
        const location = this.pickRandomLocation();

        const props = getChestProps();

        const chest = new ChestModel({
            x: location[0] || DEFAULT_POSITION.x,
            y: location[1] || DEFAULT_POSITION.x,
            spawnerId: this.id,
            ...props
        });

        this.objectsCreated.push(chest);
        this.addObject(chest.id, chest);
    }

    spawnMonster() {
        const location = this.pickRandomLocation();
        const variation = getRandomMonsterVariation();
        const {
            health,
            attack,
            sight,
            speed,
            sculls,
            minGold,
            maxGold
        } = MONSTERS_PARAMS[variation];

        const monster = new MonsterModel({
            x: location[0] || DEFAULT_POSITION.x,
            y: location[1] || DEFAULT_POSITION.x,
            gold: getRandomNumber(minGold, maxGold),
            spawnerId: this.id,
            variation,
            health,
            attack,
            sight,
            speed,
            sculls
        });

        this.objectsCreated.push(monster);
        this.addObject(monster.id, monster);
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
   