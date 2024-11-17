import React from 'react';
import {StyledLayout} from './styles'
import {MoneyBar} from './MoneyBar';
import {HealthBar} from './HealthBar';

export const Interface = () => {
    return (
        <StyledLayout>
            <MoneyBar />
            <HealthBar />
        </StyledLayout>
    )
}