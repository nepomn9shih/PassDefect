import styled from 'styled-components';

import type {ButtonProps} from './types';

export const StyledButton = styled.button<ButtonProps>`
	padding: 8px 24px;
	font-size: 20px;
	color: white;
	background: ${({variation}) => variation};
	border: none;
	border-radius: 8px;
	cursor: pointer;
	width: 100%;

	&:hover {
		/* Прозрачность вместо отдельного hover-цвета: работает с любым фоном */
		opacity: 0.85;
	}
`;
