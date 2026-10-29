import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {useGame} from '../../../reducers/selectors';
import {requestRestart, resetPlayer, setActiveWeapon, setPaused} from '../../../reducers/slices';
import {WeaponVariations} from '../../../engine/enums';
import {Button} from '../../ui-kit';
import {StyledContainer, StyledOverlay, StyledTitle} from './styles';

/** Оверлей паузы и гейм-овера поверх игрового канваса */
export const GameStateOverlay = () => {
	const dispatch = useDispatch();
	const {isPaused, isGameOver} = useGame();

	const onResume = useCallback(() => {
		dispatch(setPaused(false));
	}, [dispatch]);

	const onRestart = useCallback(() => {
		// Сбрасываем прогресс и просим сцену перезапуститься: рестарт делает MainScene по подписке
		dispatch(resetPlayer());
		dispatch(setActiveWeapon(WeaponVariations.SWORD));
		dispatch(requestRestart());
	}, [dispatch]);

	if (!isPaused && !isGameOver) {
		return null;
	}

	return (
		<StyledOverlay>
			<StyledContainer>
				<StyledTitle>{isGameOver ? 'Ты умер' : 'Пауза'}</StyledTitle>
				{isGameOver
					? null
					: <Button onClick={onResume}>Продолжить</Button>}
				<Button onClick={onRestart}>Заново</Button>
			</StyledContainer>
		</StyledOverlay>
	);
};
