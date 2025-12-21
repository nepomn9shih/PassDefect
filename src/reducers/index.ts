import {combineReducers} from 'redux';
import type {Reducer} from '@reduxjs/toolkit';

import {
	gameReducer,
	playerReducer,
	weaponReducer
} from './slices';
import type {AllGameState} from './types';

export const rootReducer: Reducer<AllGameState> = combineReducers({
	game: gameReducer,
	player: playerReducer,
	weapon: weaponReducer
});
