import {useSelector} from 'react-redux';

import type {AllGameState} from '../types';
import type {PlayerState} from '../slices/player/types';
import type {WeaponState} from '../slices/weapon/types';

export const usePlayer = (): PlayerState => {
	const selector = ({player}: AllGameState) => player;

	return useSelector(selector);
};

export const useWeapon = (): WeaponState => {
	const selector = ({weapon}: AllGameState) => weapon;

	return useSelector(selector);
};
