import styled from 'styled-components';
import { green, white } from 'styles/colorProvider';

export const Container = styled.section`
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 100px;

  @media (max-width: 1000px) {
    width: 85%;
    margin: 0;
  }
`;

export const LinkButton = styled.p`
    color: ${white};
    text-decoration: underline;
    cursor: pointer;
    margin-left: 5px;

    &&:hover {
        color: ${green};
    }
`;