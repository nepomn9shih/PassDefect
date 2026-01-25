import {
    StyledBoltsBar,
    StyledWeaponsBar,
    StyledWeaponLogo,
    StyledWeaponSwitcher
} from './styles';
import boltIconImage from '../../../assets/bolt-logo.png';
import swordIcon from '../../../assets/sword-icon.png';
import flameGunIcon from '../../../assets/flame-gun-icon.png';
import {usePlayer, useWeapon} from '../../../reducers/selectors';
import {MultipleMenuItem} from '../MultipleMenuItem';
import {PLAYER_LEVEL_PARAMS} from '../../../engine/constants/player';
import {WeaponVariations} from '../../../engine/enums';
import {useDispatch} from 'react-redux';
import {setActiveWeapon} from '../../../reducers/slices';

export const WeaponsBar = () => {
    const dispatch = useDispatch();
    const {bolts, level} = usePlayer();
    const {active, weapons} = useWeapon();
    const {maxBolts} = PLAYER_LEVEL_PARAMS[level];
    const isSword = active === WeaponVariations.SWORD;
    const isFlameGun = active === WeaponVariations.FLAME_GUN;

    const setWeaponHandler = (weapon: WeaponVariations) => {
        dispatch(setActiveWeapon(weapon));
    };

    return (
        <StyledWeaponsBar>
            <StyledWeaponSwitcher>
                {weapons[WeaponVariations.SWORD] && (
                    <StyledWeaponLogo
                        $isActive={isSword}
                        src={swordIcon}
                        onClick={() => setWeaponHandler(WeaponVariations.SWORD)}
                    />
                )}
                {weapons[WeaponVariations.FLAME_GUN] && (
                    <StyledWeaponLogo
                        $isActive={isFlameGun}
                        src={flameGunIcon}
                        onClick={() => setWeaponHandler(WeaponVariations.FLAME_GUN)}
                    />
                )}
            </StyledWeaponSwitcher>
            {isFlameGun && (
                <StyledBoltsBar>
                    <MultipleMenuItem
                        count={bolts}
                        maxCount={maxBolts}
                        icon={boltIconImage}
                    />
                </StyledBoltsBar>
            )}
        </StyledWeaponsBar> 
    );
};