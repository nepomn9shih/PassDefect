import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WeaponState} from './types';
import {WeaponVariations} from '../../../engine/enums';

const weaponSlice = createSlice({
	name: 'weapon',
	initialState: {
		weapons: {
            [WeaponVariations.FLAME_GUN]: {
                enabled: true,
                charges: -1
            },
            [WeaponVariations.SWORD]: {
                enabled: true,
                charges: -1
            },
            [WeaponVariations.GUN]: {
                enabled: false,
                charges: 10
            },
            [WeaponVariations.RIFLE]: {
                enabled: false,
                charges: 30
            }
        } 
	} as WeaponState,
	reducers: {
		addWeapon(state, {payload}: PayloadAction<WeaponVariations>) {
            state.weapons[payload].enabled = true;
		},
        addCharges(state, {payload}: PayloadAction<{weapon: WeaponVariations, value: number}>) {
            if (state.weapons[payload.weapon].charges >= 0) {
                state.weapons[payload.weapon].charges += payload.value;
            }
		}
	}
});

export const {
	addWeapon,
    addCharges
} = weaponSlice.actions;
export const weaponReducer = weaponSlice.reducer;
