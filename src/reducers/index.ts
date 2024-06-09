import {combineReducers} from 'redux';
import {
	gameReducer,
	weaponReducer
} from './slices';
import {AllGameState} from './types';

export const rootReducer = combineReducers<AllGameState>({
	game: gameReducer,
	weapon: weaponReducer
});
