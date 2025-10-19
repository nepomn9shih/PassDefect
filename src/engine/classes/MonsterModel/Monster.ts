import {MonsterProps} from './types';
import {MainScene} from '../../scenes/MainScene';
import {MonsterAnimation, MonstersVariations} from '../../enums';
import {MONSTER_INITIAL_SCALE} from './constants';
import {getMonsterAnimations} from './getMonsterAnimations';

export class Monster extends Phaser.Physics.Arcade.Sprite {
    scene: MainScene;
    x: number;
    y: number;
    variation: MonstersVariations
    velocity: number;

    constructor({
        scene,
        x,
        y,
        variation,
        frame
    }: MonsterProps) {
        super(scene, x, y, variation, frame);
        this.scene = scene;
        this.variation = variation;
        this.x = x;
        this.y = y;

        // Подключаем игрока в физику
        this.scene.physics.world.enable(this);
        // Делаем чтобы игрока не двигали другие объекты
        this.setImmovable(true);
        // Настраиваем размер игрока
        this.setScale(MONSTER_INITIAL_SCALE);
        this.setCollideWorldBounds(true);
        // Добавляем игрока на сцену
        this.scene.add.existing(this);

        this.createAnimations();
    }

    createAnimations() {
        const animations = getMonsterAnimations(this);
    
        Object.keys(animations).forEach((animation: MonsterAnimation) => this.anims.create(animations[animation]));
    }

    playAnimation(animation: MonsterAnimation) {
        this.anims.play(animation);
    }
}