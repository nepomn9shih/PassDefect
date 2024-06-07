import {combineReducers} from 'redux';
import {weaponReducer} from './slices/weapon';

export const rootReducer = combineReducers<any>({
	weapon: weaponReducer
});
