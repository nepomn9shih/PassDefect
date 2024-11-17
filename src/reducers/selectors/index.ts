import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

import {AllGameState} from '../types';
import {PlayerState} from '../slices/player/types';

export const useMoney = (): number => {
	const selector = createSelector(
		({player}: AllGameState) => player,
		(value: PlayerState) => value.money
	);

	return useSelector(selector);
};

export const useHealth = (): number => {
	const selector = createSelector(
		({player}: AllGameState) => player,
		(value: PlayerState) => value.health
	);

	return useSelector(selector);
};
