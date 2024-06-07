import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {rootReducer} from '../reducers';

/**
 * Конфигурация стора для игрока
 */
export const configureGameStore = (data: any) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState: {...data}
	});
};
