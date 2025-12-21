import {StyledMenuItem} from './styles';
import {StyledMenuIcon, StyledMenuValue} from './styles';

export const MenuItem = ({count, icon}: {
    count: number;
    icon: string; 
}) => {
    return (
        <StyledMenuItem>
            <StyledMenuIcon src={icon} />
            <StyledMenuValue>
                {count}
            </StyledMenuValue>
        </StyledMenuItem>
    )
}