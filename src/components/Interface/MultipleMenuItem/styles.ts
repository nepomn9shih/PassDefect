import styled from 'styled-components';

import {LITTLE_DESKTOP_BREAKPOINT} from '../../../constants/breakpoints';

export const StyledMenuItem = styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 2px;
`;

export const StyledMenuIcon = styled.img<{$isEmpty: boolean}>`
    height: 16px;
    width: 16px;
    object-fit: contain;
    filter: grayscale(${({$isEmpty}) => $isEmpty ? 1 : 0});

    @media (min-width: ${LITTLE_DESKTOP_BREAKPOINT}px) and (not (pointer: coarse)) {
        height: 30px;
        width: 30px;
    }
`;
