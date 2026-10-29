import styled from 'styled-components';

import type {BoxProps} from './types';

export const StyledBox = styled.div<BoxProps>`
	${({flex}) => flex && 'display: flex;'}
	padding: ${({padding}) => padding ?? '0'};
	margin: ${({margin}) => margin ?? '0'};
	width: ${({width}) => width ?? 'auto'};

	${({flexOptions}) => flexOptions && `
		flex-direction: ${flexOptions.direction ?? 'column'};
		justify-content: ${flexOptions.justify ?? 'flex-start'};
		align-items: ${flexOptions.align ?? 'flex-start'};
		gap: ${flexOptions.gap ?? '0'};
	`}
`;
