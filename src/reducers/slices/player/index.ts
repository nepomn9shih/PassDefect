import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {PlayerState} from './types';

const playerSlice = createSlice({
	name: 'game',
	initialState: {
		money: 0,
		health: 10,
		armor: 0
	} as PlayerState,
	reducers: {
		addMoney(state, {payload}: PayloadAction<number>) {
            state.money += payload;
		},
		reduceMoney(state, {payload}: PayloadAction<number>) {
            state.money -= payload;
		},
		setPlayerHealth(state, {payload}: PayloadAction<number>) {
			state.health = payload > 0 ? payload : 0;
		}
	}
});

export const {
	addMoney,
	reduceMoney,
	setPlayerHealth
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
