import {useSelector} from 'react-redux';

import type {AllGameState} from '../types';
import type {PlayerState} from '../slices/player/types';

export const usePlayer = (): PlayerState => {
	const selector = ({player}: AllGameState) => player;

	return useSelector(selector);
};
