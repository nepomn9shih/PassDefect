import scullIconImage from '../../../assets/scull-logo.png';
import moneyIconImage from '../../../assets/coin-logo.png';
import {usePlayer} from '../../../reducers/selectors';
import {MenuItem} from '../MenuItem';
import {PLAYER_LEVEL_PARAMS} from '../../../engine/constants/player';
import {StyledLevelBar, StyledResourcesBar, StyledTopBar} from './styles';

export const TopBar = () => {
    const {money, sculls, level} = usePlayer();
    const {levelUp} = PLAYER_LEVEL_PARAMS[level];
    const maxLevel = Object.values(PLAYER_LEVEL_PARAMS).length;
    // На последнем уровне не показываем сколько нужно до следующего
    const maxSculls = level === maxLevel ? 0 : levelUp;

    return (
        <StyledTopBar>
            <StyledLevelBar>
                {level}
            </StyledLevelBar>
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
        </StyledTopBar>
    )
}