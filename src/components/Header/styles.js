import styled from "styled-components";
import { darkBlue } from "styles/colorProvider";

export const StyledHeader = styled.header`
  grid-area: header;
  background-color: ${darkBlue};
  padding: 1rem 5rem 1rem 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px){
    padding: 0;
  }
`;

export const DivLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;


  @media (max-width: 1200px) {
      padding-left: 40px;
  }

  .logo {
    width: 20px;
    height: 20px;
  }
`;

export const DivIcon = styled.div`

  @media (max-width: 1200px) {
    padding-right: 40px;
}
`;
