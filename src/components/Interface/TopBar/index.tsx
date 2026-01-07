import {StyledMoneyBar} from './styles';
import scullIconImage from '../../../assets/scull-logo.png';
import moneyIconImage from '../../../assets/coin-logo.png';
import boltsIconImage from '../../../assets/bolts-logo.png';
import {usePlayer} from '../../../reducers/selectors';
import {MenuItem} from '../MenuItem';

export const TopBar = () => {
    const {money, bolts, sculls} = usePlayer();

    return (
        <StyledMoneyBar>
             <MenuItem
                count={sculls}
                icon={scullIconImage}
            />
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