import { StyledTitle } from './styles.js';

export default function Title({ children, ...props }) {
    return (
        <StyledTitle {...props}>
            {children}
        </StyledTitle>
    );
};