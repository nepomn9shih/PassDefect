import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {PlayerState} from './types';

const playerSlice = createSlice({
	name: 'game',
	initialState: {
		money: 0,
		health: 0,
		armor: 0,
		bolts: 0
	} as PlayerState,
	reducers: {
		setMoney(state, {payload}: PayloadAction<number>) {
            state.money = payload;
		},
		setPlayerHealth(state, {payload}: PayloadAction<number>) {
			state.health = payload > 0 ? payload : 0;
		},
		setBolts(state, {payload}: PayloadAction<number>) {
			state.bolts = payload > 0 ? payload : 0;
		},
		setArmor(state, {payload}: PayloadAction<number>) {
			state.armor = payload > 0 ? payload : 0;
		}
	}
});

export const {
	setMoney,
	setPlayerHealth,
	setBolts,
	setArmor
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
