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
import {clearGameFlags} from '../../reducers/slices';
import {CameraManager} from '../managers/CameraManager';
import {PlayerContainer} from '../classes/Player/PlayerContainer';
import {GameManager} from '../managers/GameManager';
import {MonsterContainer} from '../classes/MonsterModel/MonsterContainer';
import type {WeaponBolt} from '../classes/Weapon/WeaponBolt';
import {StateManager} from '../managers/StateManager';
import {Z_INDEXES} from '../constants/zindexes';
import {CHESTS_POOL_MAX_SIZE, MONSTERS_POOL_MAX_SIZE} from '../constants/pools';
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
    blockers!: Phaser.Physics.Arcade.StaticGroup;
    spawners!: Phaser.Physics.Arcade.Group;
    weaponBolts!: Phaser.Physics.Arcade.Group;
    enemyWeaponBolts!: Phaser.Physics.Arcade.Group;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    storeUnsubscribe: () => void;

    constructor(store: Store<AllGameState, Action<string>>) {
        super(SceneNames.MAIN);
        this.store = store;
        this.state = store.getState();
        this.storeUnsubscribe = () => null;

        // потом брать из стейта
        this.playerSkin = PlayerSkinVariations.KNIGHT;
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
        const controlsScene = this.scene.get(SceneNames.CONTROLS);
        controlsScene.events.on(GameEvents.MOBILE_BUTTON_DOWN, this.onMobileButtonDown, this);
        controlsScene.events.on(GameEvents.MOBILE_BUTTON_UP, this.onMobileButtonUp, this);

        this.events.once('shutdown', () => {
            controlsScene.events.off(GameEvents.MOBILE_BUTTON_DOWN, this.onMobileButtonDown, this);
            controlsScene.events.off(GameEvents.MOBILE_BUTTON_UP, this.onMobileButtonUp, this);
        });
	}

    onMobileButtonDown(buttonVariation: ButtonVariations) {
        // Паузу обрабатывает ControlsScene, игроку не передаётся
        if (buttonVariation === ButtonVariations.PAUSE) {
            return;
        }

        this.player.buttonDown(buttonVariation);
    }

    onMobileButtonUp(buttonVariation: ButtonVariations) {
        this.player.buttonUp(buttonVariation);
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
		// При рестарте сцены сбрасываем флаги паузы/гейм-овера/рестарта
		this.store.dispatch(clearGameFlags());

        // Подписываемся на изменение стора и соханяем колбек для отписки
        this.storeUnsubscribe = this.store.subscribe(() => {
            const previousGame = this.state.game;
            const previousWeapon = this.state.weapon.active;
            this.state = this.store.getState();

            if (this.state.game.restartRequested) {
                this.scene.restart();
                return;
            }

            if (this.state.game.isPaused !== previousGame.isPaused) {
                if (this.state.game.isPaused) {
                    this.scene.pause();
                } else {
                    this.scene.resume();
                }

                return;
            }

            // Переключить на активное оружие только если оно изменилось
            if (this.state.weapon.active !== previousWeapon) {
                this.player?.switchWeapon(this.state.weapon.active);
            }
        });
        // При завершении сцены вызываем коллбек отписки
        this.events.once('shutdown', () => {this.storeUnsubscribe()});
	}

    createGroups() {
		// Создаем группу для сундуков: пул с ограничением размера
		this.chests = this.physics.add.group({maxSize: CHESTS_POOL_MAX_SIZE}).setDepth(Z_INDEXES.chests);
        // Создаем группу для монстров: пул с ограничением размера
        this.monsters = this.physics.add.group({maxSize: MONSTERS_POOL_MAX_SIZE}).setDepth(Z_INDEXES.monsters);
        // Создаем группу для блокеров: статические тела дешевле в обработке
        this.blockers = this.physics.add.staticGroup().setDepth(Z_INDEXES.blockers);
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
        }
    }

    /** processCallback: проверяем, что игрок может получить урон */
    canPlayerBeHit(player: PlayerContainer, weapon: WeaponBolt) {
        return (
            Boolean(weapon.alpha)
            && !player.damageCooldown
            && Boolean(player.health)
        );
    }

    enemyWeaponWithPlayerOverlap(player: PlayerContainer, weapon: WeaponBolt) {
        // Гварды вынесены в processCallback canPlayerBeHit
        player.loseHealth(weapon.damage);
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
        
        // Проверка коллизий между игроком и сундуками: processCallback отсеивает не подходящие сундуки
        this.physics.add.overlap(
            this.player,
            this.chests,
            // @ts-expect-error не понимает что коллбек нужного формата
            this.gameManager.collectChest,
            this.gameManager.canCollectChest,
            this.gameManager
        );
        // Проверка коллизий между оружием игрока и монстрами
        // @ts-expect-error не понимает что коллбек нужного формата
        this.physics.add.overlap(this.weaponBolts, this.monsters, this.playerWeaponWithEnemyOverlap, null, this);
        // Проверка коллизий между игроком и оружием монстров: processCallback отсеивает неактивные снаряды
        // @ts-expect-error не понимает что коллбек нужного формата
        this.physics.add.overlap(this.player, this.enemyWeaponBolts, this.enemyWeaponWithPlayerOverlap, this.canPlayerBeHit, this);
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