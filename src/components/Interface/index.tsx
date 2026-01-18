import {StyledImage, StyledLayout, StyledNotPortraitWarning} from './styles'
import {TopLeftBar} from './TopLeftBar';
import {BottomLeftBar} from './BottomLeftBar';
import {BottomRightBar} from './BottomRightBar';
import {useIsMobile} from '../../hooks/useIsMobile';
import {useIsPortrait} from '../../hooks/useIsPortrait';
import rotateLogo from '../../assets/rotate-logo.png';

export const Interface = () => {
    const isMobile = useIsMobile();
    const isPortrait = useIsPortrait();

    if (isMobile && isPortrait) {
        return (
            <StyledNotPortraitWarning>
                Пожалуйста разверните экран горизонтально!
                <StyledImage src={rotateLogo} />
            </StyledNotPortraitWarning>
        );
    }

    return (
        <StyledLayout>
            <TopLeftBar />
            <BottomLeftBar />
            <BottomRightBar />
        </StyledLayout>
    );
};