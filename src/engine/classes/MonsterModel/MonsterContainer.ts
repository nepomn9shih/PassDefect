import {getRandomNumber} from './../../utils/getRandomNumber';
import {GameEvents, MonsterAnimation, MonstersVariations} from '../../enums';
import {HEALTH_BAR_CONFIG, MONSTER_INITIAL_SCALE, MONSTERS_PARAMS} from './constants';
import {MonsterContainerProps} from './types';
import {Monster} from './Monster';
import {MainScene} from '../../scenes';

export class MonsterContainer extends Phaser.GameObjects.Container {
    scene: MainScene;
    id: string;
    health: number;
    maxHealth: number;
    healthBar: Phaser.GameObjects.Graphics;
    variation: MonstersVariations;
    monster: Monster;

    constructor({
        scene,
        x,
        y,
        variation,
        id,
        health,
        maxHealth
    }: MonsterContainerProps) {
        super(scene, x, y);
        this.scene = scene;
        this.id = id;
        this.variation = variation;
         // Задаем размеры контейнера
 		this.setSize(36, 46);
        this.health = health;
        this.maxHealth = maxHealth;
        this.healthBar = this.scene.add.graphics();

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.createHealthBar();
        // создаем спрайт монстра
        this.monster = new Monster({
            scene: this.scene,
            x: 0,
            y: 0,
            variation,
            frame: '01'
        });
        this.add(this.monster);
        this.playSpawnAnimation();

        this.scene.time.delayedCall(1000, () => {
            this.playMoveAnimation();
        }, [], this);
    }

    playMoveAnimation(){
        this.monster.playAnimation(MonsterAnimation.MOVE);
    }

    playDeathAnimation(){
        this.monster.playAnimation(MonsterAnimation.DEATH);
    }
    
    playGetHitAnimation(){
        this.monster.playAnimation(MonsterAnimation.GET_HIT);
    }
    
    playSpawnAnimation(){
        this.monster.playAnimation(MonsterAnimation.SPAWN);
    }

    createHealthBar() {
        const {height, width} = HEALTH_BAR_CONFIG;
        this.healthBar.fillStyle(0xe3e4ab, 1);
        // Подложка шкалы здоровья
        this.healthBar.fillRect(
            this.x - width / 2,
            this.y - this.height * MONSTER_INITIAL_SCALE - 2 * height,
            width,
            height
        );
        // Шкала здоровья
        this.healthBar.fillStyle(0x5f010a, 1);
        this.healthBar.fillRect(
            this.x - width / 2,
            this.y - this.height * MONSTER_INITIAL_SCALE - 2 * height,
            width * (this.health / this.maxHealth), 
            height
        );
    }
    
    updateHealthBar() {
        this.healthBar.clear();
        // При нулевом здоровье шкалу не показываем
        if (this.health) {
            this.createHealthBar();
        }
    }

    loseHealth(damage: number) {
        this.health = this.health - damage;
        this.playGetHitAnimation();

        if (this.health < 0) {
            this.health = 0
        }

        this.updateHealthBar();

        if (!this.health) {
            this.makeInactive();
            this.playDeathAnimation();
			// Чтобы успела отыграть анимация смерти
			this.scene.time.delayedCall(1000, () => {
                this.monster.stop();
				this.scene.events.emit(GameEvents.DESTROY_MONSTER, this.id);
			}, [], this);
        }
    }

    makeDamage() {
        const {min, max} = MONSTERS_PARAMS[this.variation].attack;

        return getRandomNumber(min, max);
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
        this.updateHealthBar();

        if(this.body) {
            //@ts-expect-error ts не определяет нужный body
            this.body.checkCollision.none = false;
        }
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);

        if(this.body) {
            //@ts-expect-error ts не определяет нужный body
            this.body.checkCollision.none = true;
        }
    }

    update() {
        this.updateHealthBar();
    }
}
