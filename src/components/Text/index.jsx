import { StyledText } from './index.js';

function Text({ children, ...props }) {
    return (
        <StyledText {...props}>
            {children}
        </StyledText>
    );
}

export default Text;