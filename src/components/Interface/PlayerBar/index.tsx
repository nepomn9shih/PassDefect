import scullIconImage from '../../../assets/scull-logo.png';
import moneyIconImage from '../../../assets/coin-logo.png';
import healthIconImage from '../../../assets/heart-logo.png';
import armorIconImage from '../../../assets/armor-logo.png';
import {usePlayer} from '../../../reducers/selectors';
import {MenuItem} from '../MenuItem';
import {PLAYER_LEVEL_PARAMS} from '../../../engine/constants/player';
import {
    StyledHealthBar,
    StyledLevelBar,
    StyledResourcesBar,
    StyledPlayerBar,
    StyledWrapper
} from './styles';
import {MultipleMenuItem} from '../MultipleMenuItem';

export const PlayerBar = () => {
    const {money, sculls, level, health, armor} = usePlayer();
    const {maxHealth, maxArmor} = PLAYER_LEVEL_PARAMS[level];
    const {levelUp} = PLAYER_LEVEL_PARAMS[level];
    const maxLevel = Object.values(PLAYER_LEVEL_PARAMS).length;
    // На последнем уровне не показываем сколько нужно до следующего
    const maxSculls = level === maxLevel ? 0 : levelUp;

    return (
        <StyledPlayerBar>
            <StyledLevelBar>
                {level}
            </StyledLevelBar>
            <StyledWrapper>
                <StyledResourcesBar>
                    <MenuItem
                        count={sculls}
                        maxCount={maxSculls}
                        icon={scullIconImage}
                    />
                    <MenuItem
                        count={money}
                        icon={moneyIconImage}
                    />
                </StyledResourcesBar>
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
            </StyledWrapper>
        </StyledPlayerBar>
    );
};