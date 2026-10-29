import {memo} from 'react';

import {Button, Box} from '../../ui-kit';
import {StyledControlAction, StyledControlKey, StyledControlRow} from './styles';
import {CONTROLS} from './constants';

import type {ControlsMenuProps} from './types';

/** Попап с описанием клавиш управления и кнопкой возврата */
export const ControlsMenu = memo(({onBack}: ControlsMenuProps) => (
	<>
		{CONTROLS.map(({key, action}) => (
			<StyledControlRow key={key}>
				<StyledControlKey>{key}</StyledControlKey>
				<StyledControlAction>- {action}</StyledControlAction>
			</StyledControlRow>
		))}
		<Box margin='10px 0 0'>
			<Button onClick={onBack}>В меню</Button>
		</Box>
	</>
));
