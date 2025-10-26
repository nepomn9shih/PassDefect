import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

import {AllGameState} from '../types';
import {PlayerState} from '../slices/player/types';

export const usePlayer = (): PlayerState => {
	const selector = createSelector(
		({player}: AllGameState) => player,
		(value: PlayerState) => value
	);

	return useSelector(selector);
};
