import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { WeaponState } from './types';
import { WeaponVariations } from '../../../engine/enums';

const weaponSlice = createSlice({
	name: 'weapon',
	initialState: <WeaponState>{
		weapons: {
            [WeaponVariations.SWORD]: {
                enabled: true,
                isUnlimitedCharges: true,
                charges: 0,
                power: 2,
                speed: 1
            },
            [WeaponVariations.GUN]: {
                enabled: false,
                isUnlimitedCharges: false,
                charges: 10,
                power: 1,
                speed: 2
            },
            [WeaponVariations.RIFLE]: {
                enabled: false,
                isUnlimitedCharges: false,
                charges: 30,
                power: 2,
                speed: 3
            }
        }
	},
	reducers: {
		addWeapon(state, {payload}: PayloadAction<WeaponVariations>) {
            state.weapons[payload].enabled = true;
		},
        addCharges(state, {payload}: PayloadAction<{weapon: WeaponVariations, value: number}>) {
            if (!state.weapons[payload.weapon].isUnlimitedCharges) {
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
