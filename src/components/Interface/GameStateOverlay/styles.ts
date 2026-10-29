import styled from 'styled-components';

export const StyledOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	background: rgba(0, 0, 0, 0.7);
	z-index: 10;
`;

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: center;
	text-align: center;
	color: white;
	font-size: 24px;
	padding: 28px 32px 40px;
	background-color: #5C5443;
	border-radius: 20px;
`;

export const StyledTitle = styled.div`
	font-size: 32px;
	font-weight: bold;
	color: #2A1227;
`;

