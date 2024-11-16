import React from 'react';
import {
    StyledMoneyBar,
    StyledMoneyIcon,
    StyledMoneyValue
} from './styles';
import moneyIconImage from '../../../assets/coin-logo.png'
import {useMoney} from '../../../reducers/selectors';

export const MoneyBar = () => {
    const money = useMoney();

    return (
        <StyledMoneyBar>
            <StyledMoneyIcon src={moneyIconImage} />
            <StyledMoneyValue>
                {money}
            </StyledMoneyValue>
        </StyledMoneyBar>
    )
}