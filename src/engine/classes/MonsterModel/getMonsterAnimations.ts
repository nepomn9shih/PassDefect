import {MonsterAnimation} from '../../enums';
import {Monster} from './Monster';

/** Возвращает конфиги для анимации игрока */
export const getMonsterAnimations = (monster: Monster): Record<MonsterAnimation, Phaser.Types.Animations.Animation> => {
	const {variation} = monster;

	const commonProps = {
		frameRate: 10,
		skipMissedFrames: true
	};

	return {
        [MonsterAnimation.MOVE]: {
			key: MonsterAnimation.MOVE,
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
			key: MonsterAnimation.GET_HIT,
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
			key: MonsterAnimation.DEATH,
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
			key: MonsterAnimation.SPAWN,
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
