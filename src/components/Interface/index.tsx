import React from 'react';
import {StyledLayout} from './styles'
import {TopBar} from './TopBar';
import {BottomBar} from './BottomBar';

export const Interface = () => {
    return (
        <StyledLayout>
            <TopBar />
            <BottomBar />
        </StyledLayout>
    )
}