import {PlayerAnimation} from '../../enums';
import {Player} from './Player';

/** Возвращает конфиги для анимации игрока */
export const getPlayerAnimations = (player: Player): Record<PlayerAnimation, Phaser.Types.Animations.Animation> => {
	const {skin} = player;

	const commonProps = {
		frameRate: 30,
		skipMissedFrames: true
	};

	return {
        [PlayerAnimation.MOVE]: {
			key: PlayerAnimation.MOVE,
			frames: player.anims.generateFrameNames(
				skin,
				{
                    frames: [1, 2, 1, 3],
					zeroPad: 2
				}
			),
			repeat: -1,
			...commonProps
		},
		[PlayerAnimation.GET_HIT]: {
			key: PlayerAnimation.GET_HIT,
			frames: player.anims.generateFrameNames(
				skin,
				{
                    frames: [4, 5, 1],
					zeroPad: 2
				}
			),
			repeat: 0,
			...commonProps
		},
		[PlayerAnimation.DEATH]: {
			key: PlayerAnimation.DEATH,
			frames: player.anims.generateFrameNames(
				skin,
				{
                    frames: [6, 7],
					zeroPad: 2
				}
			),
			repeat: 0,
			...commonProps,
			frameRate: 5
		},
		[PlayerAnimation.SPAWN]: {
			key: PlayerAnimation.SPAWN,
			frames: player.anims.generateFrameNames(
				skin,
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
