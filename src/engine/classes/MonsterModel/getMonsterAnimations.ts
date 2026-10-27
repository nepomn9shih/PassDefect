import {MonsterAnimation, MonstersVariations} from '../../enums';
import {Monster} from './Monster';

/** Ключ анимации включает вариацию, чтобы у монстров разных видов были разные анимации */
export const getMonsterAnimationKey = (variation: MonstersVariations, animation: MonsterAnimation): string =>
	`${variation}-${animation}`;

/** Возвращает конфиги для анимации монстров */
export const getMonsterAnimations = (monster: Monster): Record<MonsterAnimation, Phaser.Types.Animations.Animation> => {
	const {variation} = monster;

	const commonProps = {
		frameRate: 10,
		skipMissedFrames: true
	};

	return {
        [MonsterAnimation.MOVE]: {
			key: getMonsterAnimationKey(variation, MonsterAnimation.MOVE),
			frames: monster.anims.generateFrameNames(
				variation,
				{
                    frames: [1, 2, 1, 3],
					zeroPad: 2
				}
			),
			repeat: -1,
			...commonProps
		},
		[MonsterAnimation.GET_HIT]: {
			key: getMonsterAnimationKey(variation, MonsterAnimation.GET_HIT),
			frames: monster.anims.generateFrameNames(
				variation,
				{
                    frames: [4, 5, 1],
					zeroPad: 2
				}
			),
			repeat: 0,
			...commonProps
		},
		[MonsterAnimation.DEATH]: {
			key: getMonsterAnimationKey(variation, MonsterAnimation.DEATH),
			frames: monster.anims.generateFrameNames(
				variation,
				{
                    frames: [6, 7],
					zeroPad: 2
				}
			),
			repeat: 0,
			...commonProps,
			frameRate: 5
		},
		[MonsterAnimation.SPAWN]: {
			key: getMonsterAnimationKey(variation, MonsterAnimation.SPAWN),
			frames: monster.anims.generateFrameNames(
				variation,
				{
                    frames: [8, 9, 1],
					zeroPad: 2
				}
			),
			repeat: 0,
			...commonProps,
			frameRate: 5
		}
	};
};
