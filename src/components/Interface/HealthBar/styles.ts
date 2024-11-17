import styled from '@emotion/styled';

export const StyledHealthBar = styled.div`
    width: 100px;
    height: 40px;
    position: absolute;
    top: calc(100vh - 80px);
    left: 20px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledHealthIcon = styled.img`
    height: 30px;
    width: 30px;
    object-fit: contain;
`;

export const StyledHealthValue = styled.div`
    height: 30px;
    width: 30px;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;
