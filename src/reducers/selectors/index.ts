import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

import {AllGameState} from '../types';

export const useMoney = (): number => {
	const selector = createSelector(
		({player}: AllGameState) => player.money,
		(value: number) => value
	);

	return useSelector(selector);
};