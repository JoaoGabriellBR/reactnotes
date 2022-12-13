import styled from 'styled-components';
import { green, white, black } from '../../styles/colorProvider';

export const StyledButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: ${green};
    color: ${black};
    border: none;
    border-radius: 45px;
    width: ${(props) => props.width || '130px'};
    height: ${(props) => props.height || '50px'};
    margin-right: ${(props) => props.marginRight};
    margin-left: ${(props) => props.marginLeft};
    margin-bottom: ${(props) => props.marginBottom};
    margin-top: ${(props) => props.marginTop};
    cursor: pointer;
    font-weight: 500;
    font-size: 1.25em;

    &&:hover{
        border: ${(props) => props.outlined ? `1.5px solid ${green}` : 'none'};
        color: ${(props) => props.outlined ? white : black};
        background: ${(props) => props.outlined ? 'transparent' : green};
        transition: 0.2s ease-in-out;
    }

    @media (max-width: 1000px) {
        width: ${(props) => props.mobile || '80%'};
      }
`;