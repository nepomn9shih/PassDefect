import {Store, UnknownAction} from '@reduxjs/toolkit';
import {AllGameState} from '../../reducers/types';

export type JSONImageType = {
	anchor: {
		x: number;
		y: number;
	};
	filename: string;
	frame: {
		w: number;
		h: number;
		x: number;
		y: number;
	};
};

export type GameStore = Store<AllGameState, UnknownAction, unknown>