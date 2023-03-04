import styled from 'styled-components';
import { green, white, black } from '../../styles/colorProvider';

export const StyledButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${green};
    color: ${black};
    border: none;
    border-radius: 8px;
    width: ${(props) => props.width || '100px'};
    min-height: ${(props) => props.height || '40px'};
    margin-right: ${(props) => props.marginRight};
    margin-left: ${(props) => props.marginLeft};
    margin-bottom: ${(props) => props.marginBottom};
    margin-top: ${(props) => props.marginTop};
    padding: ${(props) => props.padding || "1rem"};
    cursor: pointer;
    font-weight: 500;
    font-size: 1rem;
    
    &&:hover {
        border: ${(props) => props.outlined ? `1.5px solid ${green}` : 'none'};
        color: ${(props) => props.outlined ? white : black};
        background: ${(props) => props.outlined ? 'transparent' : green};
        transition: 0.2s ease-in-out;
        opacity: 0.8;
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    @media (max-width: 1000px) {
        width: ${(props) => props.mobile || '80%'};
        transition: all ease-in-out 0.3s;
      }
`;