import React from 'react';
import {
    StyledHealthBar,
    StyledHealthIcon,
    StyledHealthValue
} from './styles';
import healthIconImage from '../../../assets/heart-logo.png'
import {useHealth} from '../../../reducers/selectors';

export const HealthBar = () => {
    const health = useHealth();

    return (
        <StyledHealthBar>
            <StyledHealthIcon src={healthIconImage} />
            <StyledHealthValue>
                {health}
            </StyledHealthValue>
        </StyledHealthBar>
    )
}