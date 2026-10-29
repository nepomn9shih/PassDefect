import {useCallback, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {useGame} from '../../../reducers/selectors';
import {requestRestart, resetPlayer, setActiveWeapon, setPaused} from '../../../reducers/slices';
import {WeaponVariations} from '../../../engine/enums';
import {ControlsMenu} from '../ControlsMenu';
import {HeroMenu} from '../HeroMenu';
import {MainMenu} from '../MainMenu';
import {StyledContainer, StyledOverlay, StyledTitle} from './styles';
import {OverlayScreen} from './enums';

/** Оверлей паузы и гейм-овера поверх игрового канваса */
export const GameStateOverlay = () => {
	const dispatch = useDispatch();
	const {isPaused, isGameOver} = useGame();
	const [screen, setScreen] = useState<OverlayScreen>(OverlayScreen.MAIN);

	const onResume = useCallback(() => {
		dispatch(setPaused(false));
	}, [dispatch]);

	const onRestart = useCallback(() => {
		// Сбрасываем прогресс и просим сцену перезапуститься: рестарт делает MainScene по подписке
		dispatch(resetPlayer());
		dispatch(setActiveWeapon(WeaponVariations.SWORD));
		dispatch(requestRestart());
	}, [dispatch]);

	const onOpenControls = useCallback(() => {
		setScreen(OverlayScreen.CONTROLS);
	}, []);

	const onOpenHero = useCallback(() => {
		setScreen(OverlayScreen.HERO);
	}, []);

	const onBack = useCallback(() => {
		setScreen(OverlayScreen.MAIN);
	}, []);

	// Мапа экранов: какой контент и заголовок открыт сейчас — расширяется новыми значениями OverlayScreen
	const SCREENS = useMemo(() => ({
		[OverlayScreen.MAIN]: {
			title: isGameOver ? 'Ты умер' : 'Пауза',
			content: (
				<MainMenu
					onResume={onResume}
					onRestart={onRestart}
					onControls={onOpenControls}
					onHero={onOpenHero}
					isGameOver={isGameOver}
				/>
			),
		},
		[OverlayScreen.CONTROLS]: {
			title: 'Управление',
			content: <ControlsMenu onBack={onBack} />,
		},
		[OverlayScreen.HERO]: {
			title: 'Герой',
			content: <HeroMenu onBack={onBack} />,
		},
	}), [isGameOver, onResume, onRestart, onOpenControls, onOpenHero, onBack]);

	if (!isPaused && !isGameOver) {
		return null;
	}

	const {title, content} = SCREENS[screen];

	return (
		<StyledOverlay>
			<StyledContainer>
				<StyledTitle>{title}</StyledTitle>
				{content}
			</StyledContainer>
		</StyledOverlay>
	);
};
