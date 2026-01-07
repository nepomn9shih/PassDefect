import {StyledMenuItem} from './styles';
import {StyledMenuIcon, StyledMenuValue} from './styles';

export const MenuItem = ({count, icon, maxCount}: {
    count: number;
    maxCount?: number;
    icon: string; 
}) => {
    const value = maxCount ? `${count}/${maxCount}` : count;

    return (
        <StyledMenuItem>
            <StyledMenuIcon src={icon} />
            <StyledMenuValue>
                {value}
            </StyledMenuValue>
        </StyledMenuItem>
    )
}