import styled from 'styled-components';

import {LITTLE_DESKTOP_BREAKPOINT} from '../../../constants/breakpoints';

export const StyledMenuItem = styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledMenuIcon = styled.img`
    height: 16px;
    width: 16px;
    object-fit: contain;

    @media (min-width: ${LITTLE_DESKTOP_BREAKPOINT}px) and (not (pointer: coarse)) {
        height: 30px;
        width: 30px;
    }
`;

export const StyledMenuValue = styled.div`
    height: 16px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;

    @media (min-width: ${LITTLE_DESKTOP_BREAKPOINT}px) and (not (pointer: coarse)) {
        font-size: 18px;
        height: 30px;
    }
`;
