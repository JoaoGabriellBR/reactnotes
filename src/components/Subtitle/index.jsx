import { StyledSubtitle } from "./styles";

export default function Subtitle({children, ...props}) {
    return(
    <StyledSubtitle {...props}>
        {children}
    </StyledSubtitle>
    );
};
