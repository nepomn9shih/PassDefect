import styled from 'styled-components';

export const StyledTopBar = styled.div`
    position: fixed;
    top: 20px;
    left: 40px;
    color: #000;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledResourcesBar = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 10px;
    padding-left: 40px;
    background-color: rgba(255, 255, 255, 0.8);
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
    background-color: white;
    box-sizing: border-box;
`;

export const StyledHealthBar = styled.div`
    display: flex;
    align-items: center;
    padding-left: 40px;
    gap: 16px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.6);
`;

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;