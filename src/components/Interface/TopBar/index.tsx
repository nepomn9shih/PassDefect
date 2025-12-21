import {StyledMoneyBar} from './styles';
import moneyIconImage from '../../../assets/coin-logo.png';
import boltsIconImage from '../../../assets/bolts-logo.png';
import {usePlayer} from '../../../reducers/selectors';
import {MenuItem} from '../MenuItem';

export const TopBar = () => {
    const {money, bolts} = usePlayer();

    return (
        <StyledMoneyBar>
            <MenuItem
                count={money}
                icon={moneyIconImage}
            />
            <MenuItem
                count={bolts}
                icon={boltsIconImage}
            />
        </StyledMoneyBar>
    )
}