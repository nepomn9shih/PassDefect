import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {INITIAL_ZOOM} from '../../../engine/constants/zoom';

import type {GameState} from './types';

const gameSlice = createSlice({
	name: 'game',
	initialState: {
		zoom: INITIAL_ZOOM,
		isMobile: false,
		isTouchDevice: false
	} as GameState,
	reducers: {
		setZoom(state, {payload}: PayloadAction<number>) {
            state.zoom = payload;
		},
		setIsMobile(state, {payload}: PayloadAction<boolean>) {
			state.isMobile = payload;
		},
		setIsTouchDevice(state, {payload}: PayloadAction<boolean>) {
			state.isTouchDevice = payload;
		}
	}
});

export const {
	setZoom,
	setIsMobile,
	setIsTouchDevice
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
