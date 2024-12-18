import {combineReducers} from 'redux';
import {Reducer} from '@reduxjs/toolkit';

import {
	gameReducer,
	playerReducer,
	weaponReducer
} from './slices';
import {AllGameState} from './types';

export const rootReducer: Reducer<AllGameState> = combineReducers({
	game: gameReducer,
	player: playerReducer,
	weapon: weaponReducer
});
