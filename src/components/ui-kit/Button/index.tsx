import {memo} from 'react';

import {StyledButton} from './styles';
import {ButtonColors} from './enums';

import type {ButtonProps} from './types';

/** Переиспользуемая кнопка игрового интерфейса */
export const Button = memo(({
	type = 'button',
	variation = ButtonColors.PURPLE,
	...props
}: ButtonProps) => (
	<StyledButton
		className="ui-kit-button"
		type={type}
		variation={variation}
		{...props}
	/>
));
