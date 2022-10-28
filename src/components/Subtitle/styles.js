import styled from "styled-components";
import { white } from "styles/colorProvider";

export const StyledSubtitle = styled.h2`
    font-size: ${(props) => props.fontSize || '20px'};
    font-weight: ${(props) => props.weight || 'lighter'};
    margin-top: ${(props) => props.marginTop || '5px'};
    margin-bottom: ${(props) => props.marginBottom || '5px'};
    color: ${white};
`;