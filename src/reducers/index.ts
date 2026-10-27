import {combineReducers} from 'redux';

import {
	gameReducer,
	playerReducer,
	weaponReducer
} from './slices';

export const rootReducer = combineReducers({
	game: gameReducer,
	player: playerReducer,
	weapon: weaponReducer
});
