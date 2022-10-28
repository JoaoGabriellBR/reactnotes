import { Container, Box } from 'rbx';
import styled from 'styled-components';
import { green, white } from 'styles/colorProvider';

export const StyledContainer = styled(Container)`
    background: transparent;
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
`;

export const StyledBox = styled(Box)`
    background: transparent;
    min-height: 150px;
    padding-top: 11em;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;

    @media (max-width: 1000px) {
        text-align: center;
    }
`

export const LinkButton = styled.p`

    color: ${white};
    text-decoration: underline;
    cursor: pointer;
    margin-left: 5px;

    &&:hover {
        color: ${green};
    }
`;