import {memo} from 'react';

import {Button} from '../../ui-kit';
import {ButtonColors} from '../../ui-kit/Button/enums';

import type {MainMenuProps} from './types';

/** Основное меню оверлея паузы/гейм-овера с кнопками действий */
export const MainMenu = memo(({
	onResume,
	onRestart,
	onControls,
	onHero,
	isGameOver
}: MainMenuProps) => (
	<>
		<Button onClick={onRestart}>Заново</Button>
		<Button onClick={onHero}>Герой</Button>
		<Button onClick={onControls}>Управление</Button>
		{!isGameOver && (
			<Button
				onClick={onResume}
				variation={ButtonColors.YELLOW}
			>
				Продолжить
			</Button>
		)}
	</>
));
