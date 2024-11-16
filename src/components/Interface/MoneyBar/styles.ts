import styled from '@emotion/styled';

export const StyledMoneyBar = styled.div`
    width: 100px;
    height: 40px;
    position: relative;
    top: 20px;
    left: 20px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledMoneyIcon = styled.img`
    height: 30px;
    width: 30px;
    object-fit: contain;
`;

export const StyledMoneyValue = styled.div`
    height: 30px;
    width: 30px;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;
