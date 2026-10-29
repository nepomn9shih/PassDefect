import styled from 'styled-components';

export const StyledTable = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const StyledRow = styled.div`
	display: grid;
	grid-template-columns: 110px 56px 64px;
	gap: 16px;
	align-items: center;
	width: 100%;
`;

export const StyledHeaderCell = styled.div`
	color: #2A1227;
	font-weight: bold;
`;

export const StyledHeaderValueCell = styled(StyledHeaderCell)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

interface StyledValueCellProps {
	$highlighted?: boolean;
}

export const StyledValueCell = styled.div<StyledValueCellProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 100%;
	padding: 4px 10px;
	background-color: ${({$highlighted}) => ($highlighted ? '#B66E18' : '#2F2F2F')};
	color: #fff;
	border-radius: 8px;
	font-weight: bold;
`;
