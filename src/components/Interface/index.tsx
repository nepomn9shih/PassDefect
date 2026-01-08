import {StyledLayout} from './styles'
import {TopBar} from './TopBar';
import {BottomLeftBar} from './BottomLeftBar';
import {BottomRightBar} from './BottomRightBar';

export const Interface = () => {
    return (
        <StyledLayout>
            <TopBar />
            <BottomLeftBar />
            <BottomRightBar />
        </StyledLayout>
    );
};