import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const weaponSlice = createSlice({
	name: 'inventory',
	initialState: <any>{
		weapons: {
            sword: {
                enabled: true,
                charges: 'unlimited',
                power: 2,
                speed: 1
            },
            gun: {
                enabled: false,
                charges: 10,
                power: 1,
                speed: 2
            },
            rifle: {
                enabled: false,
                charges: 30,
                power: 2,
                speed: 3
            }
        }
	},
	reducers: {
		addWeapon(state, {payload}: PayloadAction<any>) {
            state.weapon[payload].enabled = true;
		},
        addCharges(state, {payload}: PayloadAction<any>) {
            state.weapon[payload.weapon].charges += payload.value;
		}
	}
});

export const {
	addWeapon,
    addCharges
} = weaponSlice.actions;
export const weaponReducer = weaponSlice.reducer;
