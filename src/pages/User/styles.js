import styled from "styled-components";
import { darkBlue, white } from "styles/colorProvider";


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

    @media (max-width: 1000px) {
        padding-right: 0px;
        padding-left: 0px;
    }

    .div-main{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      background-red;

      @media (max-width: 1000px){
        flex-direction: column;
        align-items: center;
      }

    }

    .div-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 1000px) {
            flex-direction: column;
        }
    }
`;

export const Widget = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: ${(props) => props.width || "180px"};
    min-height: 240px;
    border-radius: 10px;
    background-color: lightergray;
    color: ${white};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 1rem 1rem 1rem 0;
    padding: ${(props) => props.padding || "10px"};
    cursor: pointer;
    color: #000;
    transition: all ease-in-out 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover{
      scale: 1.1;
      background: ${white};
    }

    @media (max-width: 900px) {
      flex-direction: column;
      margin-bottom: 10px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      margin: 0;
      width: 80%;
    }

    .widget-body {
      min-height: 50%;

      .title {
        font-size: 20px;
      }

      .content {
        font-size: 14px;
      }
    }

    .widget-footer {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      min-height: 50%;

      .date-created {
        font-size: 12px;
      }
    }

    .widget-create-note {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }


`;
