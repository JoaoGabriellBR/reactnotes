import styled from 'styled-components';
import { white } from 'styles/colorProvider';

export const StyledTitle = styled.h1`
    font-size: ${(props) => props.fontSize || '50px'};
    font-weight: ${(props) => props.weight || 'bolder'};
    margin-top: ${(props) => props.marginTop || '5px'};
    margin-bottom: ${(props) => props.marginBottom || '5px'};
    color: ${white};
`;

