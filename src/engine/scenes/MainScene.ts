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
import {Player} from '../classes/Player';
import {GameManager} from '../managers/GameManager';
import {ChestModel} from '../classes/ChestModel';
import {Chest} from '../classes/ChestModel/Chest';

export class MainScene extends Scene {
    store: Store<AllGameState, Action<string>>;
    state: AllGameState;
    map: GameMap;
    player: Player;
    playerSkin: PlayerSkinVariations;
    cameraManager: CameraManager;
    gameManager: GameManager;
    chests: Phaser.Physics.Arcade.Group;
    score: number;

    constructor(store: Store<AllGameState, Action<string>>) {
        super(SceneNames.MAIN);
        this.store = store;
        this.state = store.getState();
        // потом брать из стейта
        this.playerSkin = PlayerSkinVariations.SPACEMAN
    }

    create() {
        this.createMap();
        this.createCameraManager();
        this.createGameManager();
        this.createGroups();
        // this.createInput();
    }

    createMap() {
		// Создаем карту
		this.map = new GameMap({
			scene: this,
			key: LevelMaps.SWAMP_PLANET,
			tileSetName: LevelMaps.SWAMP_PLANET,
			mapLayerName: MapLayersNames.MAP,
            blockerLayerName: MapLayersNames.BLOCKER,
		});
	}

    createPlayer(location: number[]) {
		// Создаем игрока
		this.player = new Player({
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

		this.gameManager = new GameManager({scene: this, mapData: this.map.map.objects});
		this.gameManager.setup();
	}

    createGroups() {
		// Создаем группу для сундуков
		this.chests = this.physics.add.group();
	}

    spawnChest(chestObject: ChestModel) {
        let chest = this.chests.getFirstDead();

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
        } else {
            chest.coins = chestObject.gold;
            chest.id = chestObject.id;
            chest.setPosition(chestObject.x, chestObject.y);
            chest.makeActive();
        }
    }

    collectChest(player: Player, chest: Chest) {
        // this.goldPickupAudio.play();
        this.score += chest.coins;
        // Обновляем счет в UI
        this.events.emit(GameEvents.UPDATE_SCORE, this.score);
        // Делаем сундук неактивным
        chest.makeInactive();
        
        this.events.emit(GameEvents.PICK_UP_CHEST, chest.id);
    }       

    addCollisions() {
        if (this.map.blockerLayer) {
            // Проверка коллизий между игроком и слоем заблоченных тайлов
            this.physics.add.collider(this.player, this.map.blockerLayer);
        }
        
        // Проверка коллизий между игроком и сундуков
        // @ts-ignore не понимает что коллбек нужного формата
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }

    update() {
        // if (this.player) {
        //     this.player.update(this.cursors);
        // };
    }
}