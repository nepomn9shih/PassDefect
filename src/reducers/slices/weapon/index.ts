import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {WeaponState} from './types';
import {WeaponVariations} from '../../../engine/enums';

const weaponSlice = createSlice({
	name: 'weapon',
	initialState: {
		weapons: {
            [WeaponVariations.FLAME_GUN]: true,
            [WeaponVariations.SWORD]: false
        },
        active: WeaponVariations.FLAME_GUN
	} as WeaponState,
	reducers: {
		addWeapon(state, {payload}: PayloadAction<WeaponVariations>) {
            state.weapons[payload] = true;
		}
	}
});

export const {
	addWeapon
} = weaponSlice.actions;
export const weaponReducer = weaponSlice.reducer;
