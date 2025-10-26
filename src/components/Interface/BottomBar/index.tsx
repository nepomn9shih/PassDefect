import React from 'react';
import {StyledHealthBar} from './styles';
import healthIconImage from '../../../assets/heart-logo.png';
import armorIconImage from '../../../assets/armor-logo.png';
import {usePlayer} from '../../../reducers/selectors';
import {MenuItem} from '../MenuItem';

export const BottomBar = () => {
    const {health, armor} = usePlayer();

    return (
        <StyledHealthBar>
            <MenuItem
                count={health}
                icon={healthIconImage}
            />
            <MenuItem
                count={armor}
                icon={armorIconImage}
            />
        </StyledHealthBar>
    )
}