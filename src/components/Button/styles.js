import styled from "styled-components";
import { green, black } from "../../styles/colorProvider";

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.outlined ? "transparent" : green)};
  color: ${black};
  border: ${(props) => (props.outlined ? `2px solid ${green}` : "none")};
  border-radius: 2rem;
  min-width: ${(props) => props.width || "100px"};
  min-height: ${(props) => props.height || "40px"};
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  padding: ${(props) => props.padding || "1rem"};
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;

  &&:hover {
    color: ${black};
    transition: 0.2s ease-in-out;
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 1000px) {
    width: ${(props) => props.mobile || "80%"};
    margin: ${(props) => props.marginMobile || "0"};
    transition: all ease-in-out 0.3s;
  }
`;
