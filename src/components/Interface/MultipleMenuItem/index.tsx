import {useIsMobile} from '../../../hooks/useIsMobile';
import {MenuItem} from '../MenuItem';
import {StyledMenuItem} from './styles';
import {StyledMenuIcon} from './styles';

export const MultipleMenuItem = ({count, icon, maxCount}: {
    count: number;
    maxCount: number;
    icon: string; 
}) => {
    const items = [];
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <MenuItem
                count={count}
                maxCount={maxCount}
                icon={icon}
            />
        );
    }

    for (let i = 1; i <= maxCount; i++) {
        items.push(
            <StyledMenuIcon
                key={i}
                src={icon}
                $isEmpty={i > count}
            />
        );
    }

    return (
        <StyledMenuItem>
            {items}
        </StyledMenuItem>
    )
}