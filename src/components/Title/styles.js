import styled from 'styled-components';
import { white } from 'styles/colorProvider';

export const StyledTitle = styled.h1`
    font-size: ${(props) => props.fontSize || '50px'};
    font-weight: ${(props) => props.weight || 'bolder'};
    margin-top: ${(props) => props.marginTop || '5px'};
    margin-bottom: ${(props) => props.marginBottom || '5px'};
    margin-right: ${(props) => props.marginRight || '5px'};
    margin-left: ${(props) => props.marginLeft|| '5px'};
    color: ${(props) => props.color || white};

    @media (max-width: 1000px) {
        text-align: center;
    }
`;

