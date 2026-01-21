import {StyledImage, StyledLayout, StyledNotPortraitWarning} from './styles'
import {PlayerBar} from './PlayerBar';
import {WeaponsBar} from './WeaponsBar';
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
            <PlayerBar />
            <WeaponsBar />
        </StyledLayout>
    );
};