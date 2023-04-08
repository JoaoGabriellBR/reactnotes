import styled from "styled-components";
import { white } from "styles/colorProvider";

export const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "header header"
    "container container";

  min-height: 100vh;
`;

export const Container = styled.section`
    grid-area: container;
    background-color: #f2f2f2;
    padding: 3rem 5rem 1rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1000px) {
        padding-right: 0px;
        padding-left: 0px;
    }

    .div-greetings{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 1000px){
        flex-direction: column;
      }
    }

    .div-main{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .title-name {
      align-self: flex-start;

        @media (max-width: 1000px) {
          align-self: center;
        }
    }
`;

export const Widget = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 8rem;
  min-height: 200px;
  border-radius: 1rem;
  background-color: ${white};
  color: ${white};
  margin: 1rem 1rem 1rem 0;
  padding: 1.2rem;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  color: #000;
  transition: all ease-in-out 0.3s;
  
  @media (max-width: 900px) {
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    margin: 0;
    width: 80%;
    min-height: 150px;
    scale: 80%;
  }

  .widget-left {
    min-height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .title {
      font-size: 1.2rem;
      margin: 0;
      padding: 0;
      word-break: break-all;
    }

    .created_at {
      font-size: 0.8rem;
      margin: 0;
      padding: 0;
    }
  }
`;
