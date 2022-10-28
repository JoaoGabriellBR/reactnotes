import styled from "styled-components";

export const StyledText = styled.p`
    font-size: ${(props) => props.fontSize || '14px'};
    font-weight: ${(props) => props.weight || 'lighter'};
`;