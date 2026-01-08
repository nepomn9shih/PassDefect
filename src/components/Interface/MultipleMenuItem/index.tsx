import {StyledMenuItem} from './styles';
import {StyledMenuIcon} from './styles';

export const MultipleMenuItem = ({count, icon, maxCount}: {
    count: number;
    maxCount: number;
    icon: string; 
}) => {
    const items = [];

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