import {memo} from 'react';

import {Button, Box} from '../../ui-kit';
import {PLAYER_LEVEL_PARAMS} from '../../../engine/constants/player';
import {usePlayer} from '../../../reducers/selectors';
import {StyledHeaderCell, StyledHeaderValueCell, StyledRow, StyledTable, StyledValueCell} from './styles';
import {HERO_STATS, MAX_LEVEL} from './constants';

interface HeroMenuProps {
	onBack: () => void;
}

/** Попап с таблицей характеристик игрока: текущие значения и на следующем уровне */
export const HeroMenu = memo(({onBack}: HeroMenuProps) => {
	const {level} = usePlayer();
	const currentParams = PLAYER_LEVEL_PARAMS[level];
	// На максимальном уровне справа показываем те же значения
	const nextParams = PLAYER_LEVEL_PARAMS[Math.min(level + 1, MAX_LEVEL)];

	return (
		<>
			<StyledTable>
				<StyledRow>
					<StyledHeaderCell>Уровень</StyledHeaderCell>
					<StyledHeaderValueCell>{level}</StyledHeaderValueCell>
					<StyledHeaderValueCell>{Math.min(level + 1, MAX_LEVEL)}</StyledHeaderValueCell>
				</StyledRow>
				{HERO_STATS.map(({param, label}) => (
					<StyledRow key={param}>
						<StyledHeaderCell>{label}</StyledHeaderCell>
						<StyledValueCell>{currentParams[param]}</StyledValueCell>
						<StyledValueCell $highlighted={nextParams[param] !== currentParams[param]}>
							{nextParams[param]}
						</StyledValueCell>
					</StyledRow>
				))}
			</StyledTable>
			<Box margin='10px 0 0'>
				<Button onClick={onBack}>В меню</Button>
			</Box>
		</>
	);
});
