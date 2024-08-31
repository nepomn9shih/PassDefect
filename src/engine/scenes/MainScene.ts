import {Action, Store} from '@reduxjs/toolkit';
import {Scene} from 'phaser';

import {GameMap} from '../classes/Map';
import {
    AtlasesKeys,
    GameEvents,
    LevelMaps,
    MapLayersNames,
    PlayerSkinVariations,
    SceneNames,
    SpawnObjects
} from '../enums';
import {AllGameState} from '../../reducers/types';
import {CameraManager} from '../managers/CameraManager';
import {PlayerContainer} from '../classes/Player/PlayerContainer';
import {GameManager} from '../managers/GameManager';
import {ChestModel} from '../classes/ChestModel';
import {Chest} from '../classes/ChestModel/Chest';
import {MonsterModel} from '../classes/MonsterModel';
import {Monster} from '../classes/MonsterModel/Monster';
import {getRandomMonsterVariation} from '../utils/getRandomMonsterVariation';
import { Weapon } from '../classes/Player/Weapon';

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
    score: number;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(store: Store<AllGameState, Action<string>>) {
        super(SceneNames.MAIN);
        this.store = store;
        this.state = store.getState();
        // потом брать из стейта
        this.playerSkin = PlayerSkinVariations.SPACEMAN;
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

    createPlayer(location: number[]) {
		// Создаем игрока
		this.player = new PlayerContainer({
			scene: this,
			skin: this.playerSkin,
            x: location[0],
            y: location[1]
		});
	}

    createCameraManager() {
		this.cameraManager = new CameraManager({scene: this});
		this.cameraManager.setup();
	}

    createGameManager() {
        this.events.on(GameEvents.SPAWN_PLAYER, (location: number[]) => {
            this.createPlayer(location);
            this.addCollisions();
        });

        this.events.on(GameEvents.SPAWN_CHEST, (chest: ChestModel) => {
            this.spawnChest(chest);
        });

        this.events.on(GameEvents.SPAWN_MONSTER, (monster: MonsterModel) => {
            this.spawnMonster(monster);
        });

		this.gameManager = new GameManager({scene: this, mapData: this.map.map.objects});
		this.gameManager.setup();
	}

    createGroups() {
		// Создаем группу для сундуков
		this.chests = this.physics.add.group();
        // Создаем группу для монстров
        this.monsters = this.physics.add.group();
	}

    spawnChest(chestObject: ChestModel) {
        let chest: Chest = this.chests.getFirstDead();

        if (!chest) {
            chest = new Chest({
                scene: this,
                x: chestObject.x,
                y: chestObject.y,
                key: AtlasesKeys.PICK_UP_OBJECTS,
                frame: SpawnObjects.CHEST,
                coins: chestObject.gold,
                id: chestObject.id
            });

            // Добавляем сундук к группе сундуков
            this.chests.add(chest);
            chest.setCollideWorldBounds(true);
        } else {
            chest.coins = chestObject.gold;
            chest.id = chestObject.id;
            chest.setPosition(chestObject.x, chestObject.y);
            chest.makeActive();
        }
    }

    spawnMonster(monsterObject: MonsterModel) {
        let monster: Monster = this.monsters.getFirstDead();
    
        if (!monster) {
            const type = getRandomMonsterVariation();

            monster = new Monster({
                scene: this,
                x: monsterObject.x,
                y: monsterObject.y,
                type,
                id: monsterObject.id,
                health: monsterObject.health,
                maxHealth: monsterObject.maxHealth
            });

            this.monsters.add(monster);
            monster.setCollideWorldBounds(true);
        } else {
            monster.id = monsterObject.id;
            monster.health = monsterObject.health;
            monster.maxHealth = monsterObject.maxHealth;
            monster.setTexture(monsterObject.type);
            monster.setPosition(monsterObject.x, monsterObject.y);
            monster.makeActive();
        }
    }

    collectChest(player: PlayerContainer, chest: Chest) {
        // this.goldPickupAudio.play();
        this.score += chest.coins;
        // Обновляем счет в UI
        this.events.emit(GameEvents.UPDATE_SCORE, this.score);

        // Делаем сундук неактивным
        chest.makeInactive();
        
        this.events.emit(GameEvents.PICK_UP_CHEST, chest.id);
    }

    enemyOverlap(weapon: Weapon, enemy: Monster) {
        if (this.player.playerAttacking && !this.player.weaponHit) {
            this.player.weaponHit = true;

            enemy.loseHealth(weapon.damage);

            this.events.emit(GameEvents.HIT_MONSTER, enemy.id);
        }
    }

    addCollisions() {
        if (this.map.blockedLayer) {
            // Проверка коллизий между игроком и слоем заблоченных тайлов
            this.physics.add.collider(this.player, this.map.blockedLayer);

             // Проверка коллизий между монстром и слоем заблоченных тайлов
            this.physics.add.collider(this.monsters, this.map.blockedLayer);
        }
        
        // Проверка коллизий между игроком и сундуками
        // @ts-ignore не понимает что коллбек нужного формата
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
        // Проверка коллизий между игроком и монстрами
        // @ts-ignore не понимает что коллбек нужного формата
        this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null, this);
    }

    update() {
        if (this.player) {
            this.cursors && this.player.update(this.cursors);
        };
    }
}