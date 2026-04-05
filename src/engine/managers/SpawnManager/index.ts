import type { ChestModel } from "../../classes/ChestModel";
import { Chest } from "../../classes/ChestModel/Chest";
import type { MonsterModel } from "../../classes/MonsterModel";
import { MonsterContainer } from "../../classes/MonsterModel/MonsterContainer";
import { PlayerContainer } from "../../classes/Player/PlayerContainer";
import { PlayerModel } from "../../classes/Player/PlayerModel";
import { Spawner } from "../../classes/Spawner";
import type { AddObject } from "../../classes/Spawner/types";
import { AtlasesKeys, GameEvents, SpawnObjects } from "../../enums";
import type { MainScene } from "../../scenes";
import { getRandomMonsterVariation } from "../../utils/getRandomMonsterVariation";
import { CHEST_SPAWN_INTERVAL, MONSTER_SPAWN_INTERVAL } from "./constants";
import type { SpawnManagerProps } from "./types";

/** Менеджер отвечающий за спавн игрока, монстров и сундуков */
export class SpawnManager {
    scene: MainScene;

    constructor({scene}: SpawnManagerProps) {
        this.scene = scene;
    }

    setup() {
        this.setupEvents();
        this.setupSpawners();
        this.scene.gameManager.addPlayer();
    }

    setupEvents() {
        this.scene.events.on(GameEvents.SPAWN_PLAYER, (playerObject: PlayerModel) => {
            this.createPlayer(playerObject);
            this.scene.addCollisions();
        });
        
        this.scene.events.on(GameEvents.SPAWN_CHEST, (chest: ChestModel) => {
            this.spawnChest(chest);
        });
        
        this.scene.events.on(GameEvents.SPAWN_MONSTER, (monster: MonsterModel) => {
            this.spawnMonster(monster);
        });
    }

    setupSpawners() {	
		let spawner: Spawner;

		// Создаем спавнер сундука
		Object.keys(this.scene.gameManager.chestLocations).forEach((key) => {
			const config = {
				spawnInterval: CHEST_SPAWN_INTERVAL,
				limit: 1,
				id: `chest-${key}`,
				spawnerType: SpawnObjects.CHEST
			};

			spawner = new Spawner({
				scene: this.scene,
				config,
				spawnLocations: this.scene.gameManager.chestLocations[key], 
				addObject: this.scene.gameManager.addChest.bind(this.scene.gameManager) as AddObject, 
				deleteObject: this.scene.gameManager.deleteChest.bind(this.scene.gameManager)
			});
	
			this.scene.gameManager.spawners[spawner.id] = spawner;
		});

		// Создаем спавнер монстров
		Object.keys(this.scene.gameManager.monsterLocations).forEach((key) => {
			const config = {
				spawnInterval: MONSTER_SPAWN_INTERVAL,
				limit: 1,
				id: `monster-${key}`,
				spawnerType: SpawnObjects.MONSTER
			};
			
			spawner = new Spawner({
				scene: this.scene,
				config,
				spawnLocations: this.scene.gameManager.monsterLocations[key],
				addObject: this.scene.gameManager.addMonster.bind(this.scene.gameManager) as AddObject,
				deleteObject: this.scene.gameManager.deleteMonster.bind(this.scene.gameManager)
			});

			this.scene.gameManager.spawners[spawner.id] = spawner;
		});
	}

    spawnChest(chestObject: ChestModel) {
            let chest: Chest = this.scene.chests.getFirstDead();
    
            if (!chest) {
                chest = new Chest({
                    scene: this.scene,
                    x: chestObject.x,
                    y: chestObject.y,
                    key: AtlasesKeys.PICK_UP_OBJECTS,
                    variation: chestObject.variation,
                    coins: chestObject.gold,
                    hearts: chestObject.hearts,
                    bolts: chestObject.bolts,
                    armor: chestObject.armor,
                    id: chestObject.id
                });
    
                // Добавляем сундук к группе сундуков
                this.scene.chests.add(chest);
                chest.setCollideWorldBounds(true);
            } else {
                chest.coins = chestObject.gold;
                chest.hearts = chestObject.hearts;
                chest.bolts = chestObject.bolts;
                chest.armor = chestObject.armor;
                chest.variation = chestObject.variation;
                chest.id = chestObject.id;
                // Обновляет картинку так как вариация могла измениться
                chest.updateChest();
                chest.setPosition(chestObject.x, chestObject.y);
                chest.makeActive();
            }
        }
    
    spawnMonster(monsterObject: MonsterModel) {
        let monster: MonsterContainer = this.scene.monsters.getFirstDead();
        
        if (!monster) {
            const variation = getRandomMonsterVariation();
    
            monster = new MonsterContainer({
                scene: this.scene,
                x: monsterObject.x,
                y: monsterObject.y,
                variation,
                id: monsterObject.id,
                health: monsterObject.health,
                maxHealth: monsterObject.maxHealth,
                sculls: monsterObject.sculls,
                gold: monsterObject.gold
            });
    
            this.scene.monsters.add(monster);
        } else {
            monster.id = monsterObject.id;
            monster.health = monsterObject.health;
            monster.maxHealth = monsterObject.maxHealth;
            monster.sculls = monsterObject.sculls;
            monster.gold = monsterObject.gold;
            monster.monster.setTexture(monsterObject.variation);
            monster.setPosition(monsterObject.x, monsterObject.y);
            monster.makeActive();
        }
    
        monster.playSpawnAnimation();
    }

    createPlayer(playerObject: PlayerModel) {
        this.scene.player = new PlayerContainer({
            scene: this.scene,
            x: playerObject.x,
            y: playerObject.y,
            skin: this.scene.playerSkin,
            level: playerObject.level,
            health: playerObject.health,
            maxHealth: playerObject.maxHealth,
            gold: playerObject.gold,
            bolts: playerObject.bolts,
            maxBolts: playerObject.maxBolts,
            armor: playerObject.armor,
            maxArmor: playerObject.maxArmor,
            id: playerObject.id,
            sculls: playerObject.sculls
        });
    }
}