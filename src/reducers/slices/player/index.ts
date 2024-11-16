import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {PlayerState} from './types';

const playerSlice = createSlice({
	name: 'game',
	initialState: {
		money: 0
	} as PlayerState,
	reducers: {
		addMoney(state, {payload}: PayloadAction<number>) {
            state.money += payload;
		},
		reduceMoney(state, {payload}: PayloadAction<number>) {
            state.money -= payload;
		}
	}
});

export const {
	addMoney,
	reduceMoney
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
