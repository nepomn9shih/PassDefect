import {memo} from 'react';

import {StyledBox} from './styles';

import type {BoxProps} from './types';

/** Контейнер для оборачивания компонентов с настройкой отступов и flex-выравнивания */
export const Box = memo(({flex = false, ...props}: BoxProps) => (
	<StyledBox
		className="ui-kit-box"
		flex={flex}
		{...props}
	/>
));
