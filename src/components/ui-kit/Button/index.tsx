import {memo} from 'react';

import {StyledButton} from './styles';

import type {ButtonProps} from './types';

/** Переиспользуемая кнопка игрового интерфейса */
export const Button = memo(({
	type = 'button',
	...props
}: ButtonProps) => (
	<StyledButton
		className="ui-kit-button"
		type={type}
		{...props}
	/>
));
