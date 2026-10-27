import {configureStore} from '@reduxjs/toolkit';

import {rootReducer} from '../reducers';

import type {AllGameState} from '../reducers/types';

/**
 * Конфигурация стора для игрока
 */
export const configureGameStore = (data: Partial<AllGameState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState: {...data}
	});
};
