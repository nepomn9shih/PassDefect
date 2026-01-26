import {LITTLE_DESKTOP_BREAKPOINT} from './../../../constants/breakpoints';
import styled from 'styled-components';

export const StyledWeaponsBar = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 10px;
    margin-right: 20px;
    margin-top: 20px;
`;

export const StyledBoltsBar = styled.div`
    color: #000;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const StyledWeaponSwitcher = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledWeaponLogo = styled.img<{$isActive: boolean}>`
    height: 20px;
    width: 40px;
    padding: 6px;
    background-color: ${({$isActive}) => $isActive ? 'rgba(255, 255, 255, 0.6)' : '#282a31'};
    object-fit: contain;
    border-radius: 10px;
    border: 2px solid ${({$isActive}) => $isActive ? 'goldenrod' : 'rgba(255, 255, 255, 0.6)'};
    filter: grayscale(${({$isActive}) => $isActive ? '0' : '1'});
    cursor: pointer;

    @media (min-width: ${LITTLE_DESKTOP_BREAKPOINT}px) and (not (pointer: coarse)) {
        height: 40px;
        width: 80px;
    }
`;
