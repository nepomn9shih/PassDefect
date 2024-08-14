import {PlayerAnimation} from '../../enums';
import {Player} from './Player';

/** Возвращает конфиги для анимации игрока */
export const getPlayerAnimations = (player: Player): Record<PlayerAnimation, Phaser.Types.Animations.Animation> => {
	const {skin} = player;

	const commonProps = {
		frameRate: 30,
		skipMissedFrames: true,
        yoyo: true
	};

	return {
		[PlayerAnimation.MOVE_LEFT]: {
			key: PlayerAnimation.MOVE_LEFT,
			frames: player.anims.generateFrameNames(
				skin,
				{
                    frames: [5, 6, 7, 8],
					start: 5,
					end: 8,
					zeroPad: 2
				}
			),
			...commonProps
		},
        [PlayerAnimation.MOVE_RIGHT]: {
			key: PlayerAnimation.MOVE_RIGHT,
			frames: player.anims.generateFrameNames(
				skin,
				{
                    frames: [1, 2, 3, 4],
					start: 1,
					end: 4,
					zeroPad: 2
				}
			),
			...commonProps
		}
	};
};
