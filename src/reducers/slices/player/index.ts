import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
		addMoney(state, {payload}: PayloadAction<number>) {
            state.money += payload;
		},
		reduceMoney(state, {payload}: PayloadAction<number>) {
            state.money -= payload;
		},
		loseMoney(state) {
            state.money = 0;
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
	addMoney,
	reduceMoney,
	loseMoney,
	setPlayerHealth,
	setBolts,
	setArmor
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
