import { StyledButton } from './styles';

export default function Button({ children, ...props }) {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
}