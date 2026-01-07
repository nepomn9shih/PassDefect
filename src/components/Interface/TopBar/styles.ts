import styled from 'styled-components';

export const StyledTopBar = styled.div`
    position: fixed;
    padding-left: 50px;
    top: 20px;
    left: 40px;
    height: 60px;
    color: #000;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.4);
`;

export const StyledResourcesBar = styled.div`
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px;
`;

export const StyledLevelBar = styled.div`
    position: fixed;
    left: 10px;
    height: 70px;
    width: 70px;
    font-size: 30px;
    font-weight: bold;
    border-radius: 50%;
    border: 10px solid goldenrod;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
`;
