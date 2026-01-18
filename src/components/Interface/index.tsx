import {StyledLayout} from './styles'
import {TopLeftBar} from './TopLeftBar';
import {BottomLeftBar} from './BottomLeftBar';
import {BottomRightBar} from './BottomRightBar';

export const Interface = () => {
    return (
        <StyledLayout>
            <TopLeftBar />
            <BottomLeftBar />
            <BottomRightBar />
        </StyledLayout>
    );
};