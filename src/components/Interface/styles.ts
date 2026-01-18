import styled from 'styled-components';

export const StyledLayout = styled.div`
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
`;

export const StyledNotPortraitWarning = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 24px;
    padding: 20px;
    color: goldenrod;
    background-color: black;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
`;

export const StyledImage = styled.img`
    height: 80px;
    width: 80px;
    object-fit: contain;
`;
