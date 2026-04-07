import type {Action, Store} from '@reduxjs/toolkit';
import {Scene} from 'phaser';

import {GameMap} from '../classes/Map';
import {
    ButtonVariations,
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
import {MonsterContainer} from '../classes/MonsterModel/MonsterContainer';
import type {WeaponBolt} from '../classes/Weapon/WeaponBolt';
import {StateManager} from '../managers/StateManager';
import {Z_INDEXES} from '../constants/zindexes';
import { SpawnManager } from '../managers/SpawnManager';

export class MainScene extends Scene {
    store: Store<AllGameState, Action<string>>;
    state: AllGameState;
    map!: GameMap;
    player!: PlayerContainer;
    playerSkin: PlayerSkinVariations;
    cameraManager!: CameraManager;
    gameManager!: GameManager;
    stateManager!: StateManager;
    spawnManager!: SpawnManager;
    chests!: Phaser.Physics.Arcade.Group;
    monsters!: Phaser.Physics.Arcade.Group;
    blockers!: Phaser.Physics.Arcade.Group;
    spawners!: Phaser.Physics.Arcade.Group;
    weaponBolts!: Phaser.Physics.Arcade.Group;
    enemyWeaponBolts!: Phaser.Physics.Arcade.Group;
    score: number;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    storeUnsubscribe: () => void;

    constructor(store: Store<AllGameState, Action<string>>) {
        super(SceneNames.MAIN);
        this.store = store;
        this.state = store.getState();
        this.storeUnsubscribe = () => null;

        // потом брать из стейта
        this.playerSkin = PlayerSkinVariations.KNIGHT;
        this.score = 0;
    }

    create() {
        // StateManager всегда создается первым
        this.createStateManager();
        this.createMap();
        // createGroups должно отработать раньше createGameManager
        this.createGroups();
        this.createCameraManager();
        this.createGameManager();
        // createGroups должно отработать позже createGameManager
        this.createSpawnManager();
        this.createControls();
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

    createControls() {
        this.cursors = this?.input?.keyboard?.createCursorKeys();

        // Подключаем сцену с управлением
        this.scene.launch(SceneNames.CONTROLS);
        this.scene.get(SceneNames.CONTROLS).events.on(GameEvents.MOBILE_BUTTON_DOWN, (buttonVariation: ButtonVariations) => {
            this.player.buttonDown(buttonVariation);
        }, this);
        this.scene.get(SceneNames.CONTROLS).events.on(GameEvents.MOBILE_BUTTON_UP, (buttonVariation: ButtonVariations) => {
            this.player.buttonUp(buttonVariation);
        }, this);
	}

    createCameraManager() {
		this.cameraManager = new CameraManager({scene: this});
		this.cameraManager.setup();
	}

    createSpawnManager() {
        this.spawnManager = new SpawnManager({scene: this});
        this.spawnManager.setup();
    }

    createGameManager() {
        this.gameManager = new GameManager({scene: this, mapData: this.map.map!.objects});
        this.gameManager.setup();
    }

    createStateManager() {
		this.stateManager = new StateManager({scene: this});

        // Подписываемся на изменение стора и соханяем колбек для отписки
        this.storeUnsubscribe = this.store.subscribe(() => {
            this.state = this.store.getState();
            // Переключить на активное оружие из нового стейта
            this.player?.switchWeapon(this.state.weapon.active);
        });
        // При уничтожении сцены вызываем коллбек отписки
        this.events.on('destroy', () => {this.storeUnsubscribe()}, this);
	}

    createGroups() {
		// Создаем группу для сундуков
		this.chests = this.physics.add.group().setDepth(Z_INDEXES.chests);
        // Создаем группу для монстров
        this.monsters = this.physics.add.group().setDepth(Z_INDEXES.monsters);
        // Создаем группу для блокеров
        this.blockers = this.physics.add.group().setDepth(Z_INDEXES.blockers);
        // Создаем группу для спавнеров
        this.spawners = this.physics.add.group().setDepth(Z_INDEXES.spawners);
        // Создаем группу для снарядов оружия
        this.weaponBolts = this.physics.add.group().setDepth(Z_INDEXES.player);
        // Создаем группу для снарядов оружия врагов
        this.enemyWeaponBolts = this.physics.add.group().setDepth(Z_INDEXES.monsters);
        // Включаем обновление дочерних элементов
        this.monsters.runChildUpdate = true;
	}

    playerWeaponWithEnemyOverlap(weapon: WeaponBolt, enemy: MonsterContainer) {
        if (this.player.playerAttacking && !this.player.weaponHit) {
            this.player.weaponHit = true;

            enemy.loseHealth(weapon.damage);

            this.events.emit(GameEvents.HIT_MONSTER, enemy.id);
        }
    }

    enemyWeaponWithPlayerOverlap(player: PlayerContainer, weapon: WeaponBolt) {
        if (
            Boolean(weapon.alpha)
            && !this.player.damageCooldown
            && this.player.health
        ) {
            player.loseHealth(weapon.damage);

            this.events.emit(GameEvents.HIT_PLAYER);
        }
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
        // Проверка коллизий между монстром и игроком
        this.physics.add.collider(this.monsters, this.player);
        // Проверка коллизий между монстром и монстром
        this.physics.add.collider(this.monsters, this.monsters);
        
        // Проверка коллизий между игроком и сундуками
        this.physics.add.overlap(
            this.player,
            this.chests,
            // @ts-expect-error не понимает что коллбек нужного формата
            this.gameManager.collectChest,
            null,
            this.gameManager
        );
        // Проверка коллизий между оружием игрока и монстрами
        // @ts-expect-error не понимает что коллбек нужного формата
        this.physics.add.overlap(this.weaponBolts, this.monsters, this.playerWeaponWithEnemyOverlap, null, this);
        // Проверка коллизий между игроком и оружием монстров
        // @ts-expect-error не понимает что коллбек нужного формата
        this.physics.add.overlap(this.player, this.enemyWeaponBolts, this.enemyWeaponWithPlayerOverlap, null, this);
        // Проверка коллизий между спавнером и блокерами
        this.physics.add.overlap(
            this.spawners,
            this.blockers,
            // @ts-expect-error не понимает что коллбек нужного формата
            this.gameManager.deleteBlocker,
            null,
            this.gameManager
        );
    }

    update() {
        if (this.player) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.cursors && this.player.update(this.cursors);
        };
    }
}