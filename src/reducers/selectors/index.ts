import {useSelector} from 'react-redux';

import type {AllGameState} from '../types';
import type {PlayerState} from '../slices/player/types';
import type {WeaponState} from '../slices/weapon/types';
import type {GameState} from '../slices/game/types';

export const selectPlayer = ({player}: AllGameState): PlayerState => player;

export const selectWeapon = ({weapon}: AllGameState): WeaponState => weapon;

export const selectGame = ({game}: AllGameState): GameState => game;

export const usePlayer = (): PlayerState => useSelector(selectPlayer);

export const useWeapon = (): WeaponState => useSelector(selectWeapon);

export const useGame = (): GameState => useSelector(selectGame);
