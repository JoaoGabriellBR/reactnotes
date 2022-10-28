import { StyledButton } from './index';

export default function Button({ children, ...props }) {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
}