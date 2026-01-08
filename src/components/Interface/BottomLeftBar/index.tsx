import {StyledHealthBar} from './styles';
import healthIconImage from '../../../assets/heart-logo.png';
import armorIconImage from '../../../assets/armor-logo.png';
import {usePlayer} from '../../../reducers/selectors';
import {MultipleMenuItem} from '../MultipleMenuItem';
import {PLAYER_LEVEL_PARAMS} from '../../../engine/constants/player';

export const BottomLeftBar = () => {
    const {health, armor, level} = usePlayer();
    const {maxHealth, maxArmor} = PLAYER_LEVEL_PARAMS[level];

    return (
        <StyledHealthBar>
            <MultipleMenuItem
                count={health}
                maxCount={maxHealth}
                icon={healthIconImage}
            />
            <MultipleMenuItem
                count={armor}
                maxCount={maxArmor}
                icon={armorIconImage}
            />
        </StyledHealthBar>
    );
};