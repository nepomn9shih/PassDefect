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
        [PlayerAnimation.MOVE]: {
			key: PlayerAnimation.MOVE,
			frames: player.anims.generateFrameNames(
				skin,
				{
                    frames: [1, 2, 1, 3],
					zeroPad: 2
				}
			),
			...commonProps
		}
	};
};
