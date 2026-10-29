import styled from 'styled-components';

import {LITTLE_DESKTOP_BREAKPOINT} from '../../../constants/breakpoints';

export const StyledControlRow = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
	justify-content: space-between;
	width: 100%;

	@media (min-width: ${LITTLE_DESKTOP_BREAKPOINT}px) {
		gap: 16px;
	}
`;

export const StyledControlKey = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
`;

export const StyledControlAction = styled.div`
	color: #2A1227;
	font-weight: bold;
`;
