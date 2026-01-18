import styled from 'styled-components';

export const StyledMenuItem = styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 2px;
`;

export const StyledMenuIcon = styled.img<{$isEmpty: boolean}>`
    height: 30px;
    width: 30px;
    object-fit: contain;
    filter: grayscale(${({$isEmpty}) => $isEmpty ? 1 : 0})
`;
