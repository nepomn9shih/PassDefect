import type {Action, Store} from '@reduxjs/toolkit';
import {Scene} from 'phaser';

import {GameMap} from '../classes/Map';
import {
    AtlasesKeys,
    GameEvents,
    LevelMaps,
    MapLayersNames,
    PlayerSkinVariations,
    SceneNames
} from '../enums';
import type {AllGameState} from '../../reducers/types';
import {CameraManager} from '../managers/CameraManager';
import {PlayerContainer} from '../classes/Player/PlayerContainer';
import {GameManager} from '../managers/GameManager';
import {ChestModel} from '../classes/ChestModel';
import {Chest} from '../classes/ChestModel/Chest';
import {MonsterModel} from '../classes/MonsterModel';
import {MonsterContainer} from '../classes/MonsterModel/MonsterContainer';
import {getRandomMonsterVariation} from '../utils/getRandomMonsterVariation';
import {PlayerModel} from '../classes/Player/PlayerModel';
import {SpawnerImage} from '../classes/Spawner/SpawnerImage';
import {MapObject} from '../classes/MapObject';
import type { WeaponBolt } from '../classes/Weapon/WeaponBolt';

export class MainScene extends Scene {
    store: Store<AllGameState, Action<string>>;
    state: AllGameState;
    map!: GameMap;
    player!: PlayerContainer;
    playerSkin: PlayerSkinVariations;
    cameraManager!: CameraManager;
    gameManager!: GameManager;
    chests!: Phaser.Physics.Arcade.Group;
    monsters!: Phaser.Physics.Arcade.Group;
    blockers!: Phaser.Physics.Arcade.Group;
    spawners!: Phaser.Physics.Arcade.Group;
    score: number;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(store: Store<AllGameState, Action<string>>) {
        super(SceneNames.MAIN);
        this.store = store;
        this.state = store.getState();
        // потом брать из стейта
        this.playerSkin = PlayerSkinVariations.KNIGHT;
        this.score = 0;
    }

    create() {
        this.createMap();
        // createGroups должно отработать раньше createGameManager
        this.createGroups();
        this.createCameraManager();
        this.createGameManager();
        // this.createInput();
        this.cursors= this?.input?.keyboard?.createCursorKeys();
    }

    createMap() {
		// Создаем карту
		this.map = new GameMap({
			scene: this,
			key: LevelMaps.SWAMP_PLANET,
			tileSetName: LevelMaps.SWAMP_PLANET,
			mapLayerName: MapLayersNames.MAP,
            blockedLayerName: MapLayersNames.BLOCKER,
		});
	}

    createPlayer(playerObject: PlayerModel) {
        this.player = new PlayerContainer({
            scene: this,
            x: playerObject.x,
            y: playerObject.y,
            skin: this.playerSkin,
            health: playerObject.health,
            maxHealth: playerObject.maxHealth,
            gold: playerObject.gold,
            bolts: playerObject.bolts,
            maxBolts: playerObject.maxBolts,
            armor: playerObject.armor,
            maxArmor: playerObject.maxArmor,
            id: playerObject.id,
        });
    }

    createCameraManager() {
		this.cameraManager = new CameraManager({scene: this});
		this.cameraManager.setup();
	}

    createGameManager() {
        this.events.on(GameEvents.SPAWN_PLAYER, (playerObject: PlayerModel) => {
            this.createPlayer(playerObject);
            this.addCollisions();
        });

        this.events.on(GameEvents.SPAWN_CHEST, (chest: ChestModel) => {
            this.spawnChest(chest);
        });

        this.events.on(GameEvents.SPAWN_MONSTER, (monster: MonsterModel) => {
            this.spawnMonster(monster);
        });

        this.events.on(GameEvents.REMOVE_CHEST, (chestId: string) => {
            const chests = this.chests.getChildren() as Chest[];
            chests.forEach((chest) => {
                if (chest.id === chestId) {
                    chest.makeInactive();
                }
            });
        });   

		this.gameManager = new GameManager({scene: this, mapData: this.map.map!.objects});
		this.gameManager.setup();
	}

    createGroups() {
		// Создаем группу для сундуков
		this.chests = this.physics.add.group();
        // Создаем группу для монстров
        this.monsters = this.physics.add.group();
        // Создаем группу для монстров
        this.blockers = this.physics.add.group();
        // Создаем группу для спавнеров
        this.spawners = this.physics.add.group();
        // Включаем обновление дочерних элементов
        this.monsters.runChildUpdate = true;
	}

    spawnChest(chestObject: ChestModel) {
        let chest: Chest = this.chests.getFirstDead();

        if (!chest) {
            chest = new Chest({
                scene: this,
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
            this.chests.add(chest);
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
        let monster: MonsterContainer = this.monsters.getFirstDead();
    
        if (!monster) {
            const variation = getRandomMonsterVariation();

            monster = new MonsterContainer({
                scene: this,
                x: monsterObject.x,
                y: monsterObject.y,
                variation,
                id: monsterObject.id,
                health: monsterObject.health,
                maxHealth: monsterObject.maxHealth
            });

            this.monsters.add(monster);
        } else {
            monster.id = monsterObject.id;
            monster.health = monsterObject.health;
            monster.maxHealth = monsterObject.maxHealth;
            monster.monster.setTexture(monsterObject.variation);
            monster.setPosition(monsterObject.x, monsterObject.y);
            monster.makeActive();
        }

        monster.playSpawnAnimation();
    }

    collectChest(player: PlayerContainer, chest: Chest) {
        // this.goldPickupAudio.play();
        
        this.events.emit(GameEvents.PICK_UP_CHEST, chest.id, player.id);
    }

    weaponEnemyOverlap(weapon: WeaponBolt, enemy: MonsterContainer) {
        if (this.player.playerAttacking && !this.player.weaponHit) {
            this.player.weaponHit = true;

            enemy.loseHealth(weapon.damage);

            this.events.emit(GameEvents.HIT_MONSTER, enemy.id);
        }
    }

    enemyOverlap(player: PlayerContainer, enemy: MonsterContainer) {
        if (!this.player.damageCooldown && this.player.health) {
            player.loseHealth(enemy.makeDamage());

            this.events.emit(GameEvents.HIT_PLAYER, enemy.id);
        }
    }

    // Удаляем блокеры которые накладываются на спавнеры
    deleteBlocker(_spawner: SpawnerImage, blocker: MapObject) {
        blocker.destroy();
    }

    addCollisions() {
        if (this.map.blockedLayer) {
            // Проверка коллизий между игроком и слоем заблоченных тайлов
            this.physics.add.collider(this.player, this.map.blockedLayer);

             // Проверка коллизий между монстром и слоем заблоченных тайлов
            this.physics.add.collider(this.monsters, this.map.blockedLayer);
        }

        // Проверка коллизий между игроком и слоем заблоченных объектов
        this.physics.add.collider(this.player, this.blockers);
        // Проверка коллизий между монстрами и слоем заблоченных объектов
        this.physics.add.collider(this.monsters, this.blockers);
        // Проверка коллизий между спавнерами и слоем заблоченных объектов
        this.physics.add.collider(this.spawners, this.blockers);
        
        // Проверка коллизий между игроком и сундуками
        // @ts-expect-error не понимает что коллбек нужного формата
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
        // Проверка коллизий между оружием игрока и монстрами
        // @ts-expect-error не понимает что коллбек нужного формата
        this.physics.add.overlap(this.player.weapon.weaponBolt, this.monsters, this.weaponEnemyOverlap, null, this);
        // Проверка коллизий между игроком и монстрами
        // @ts-expect-error не понимает что коллбек нужного формата
        this.physics.add.overlap(this.player, this.monsters, this.enemyOverlap, null, this);
        // Проверка коллизий между спавнером и блокерами
        // @ts-expect-error не понимает что коллбек нужного формата
        this.physics.add.overlap(this.spawners, this.blockers, this.deleteBlocker, null, this);
    }

    update() {
        if (this.player) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.cursors && this.player.update(this.cursors);
        };
    }
}