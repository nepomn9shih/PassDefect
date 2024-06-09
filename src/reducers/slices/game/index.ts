import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { INITIAL_ZOOM } from '../../../engine/constants/zoom';

import type {GameState} from './types';

const gameSlice = createSlice({
	name: 'game',
	initialState: <GameState>{
		zoom: INITIAL_ZOOM
	},
	reducers: {
		setZoom(state, {payload}: PayloadAction<number>) {
            state.zoom = payload;
		}
	}
});

export const {
	setZoom
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
