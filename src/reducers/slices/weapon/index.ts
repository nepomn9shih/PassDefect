import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {WeaponState} from './types';
import {WeaponVariations} from '../../../engine/enums';

const weaponSlice = createSlice({
	name: 'weapon',
	initialState: {
		weapons: {
			[WeaponVariations.SWORD]: true,
            [WeaponVariations.FLAME_GUN]: true,
        },
        active: WeaponVariations.SWORD
	} as WeaponState,
	reducers: {
		addWeapon(state, {payload}: PayloadAction<WeaponVariations>) {
            state.weapons[payload] = true;
		},
		setActiveWeapon(state, {payload}: PayloadAction<WeaponVariations>) {
            state.active = payload;
		}
	}
});

export const {
	addWeapon,
	setActiveWeapon
} = weaponSlice.actions;
export const weaponReducer = weaponSlice.reducer;
