import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {INITIAL_ZOOM} from '../../../engine/constants/zoom';

import type {GameState} from './types';

const gameSlice = createSlice({
	name: 'game',
	initialState: {
		zoom: INITIAL_ZOOM,
		isMobile: false,
		isTouchDevice: false,
		isPaused: false,
		isGameOver: false,
		restartRequested: false
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
		},
		setPaused(state, {payload}: PayloadAction<boolean>) {
			state.isPaused = payload;
		},
		setGameOver(state) {
			state.isGameOver = true;
		},
		requestRestart(state) {
			state.restartRequested = true;
		},
		/** Сброс флагов паузы/гейм-овера/рестарта: сцена вызывает при рестарте */
		clearGameFlags(state) {
			state.isPaused = false;
			state.isGameOver = false;
			state.restartRequested = false;
		}
	}
});

export const {
	setZoom,
	setIsMobile,
	setIsTouchDevice,
	setPaused,
	setGameOver,
	requestRestart,
	clearGameFlags
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
