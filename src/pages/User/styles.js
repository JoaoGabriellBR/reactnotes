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

export const WidgetArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;

  .widget {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: ${(props) => props.width || "240px"};
    height: 120px;
    border-radius: 10px;
    background-color: lightergray;
    color: ${white};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-right: 10px;
    cursor: pointer;
    transition: all ease-in-out 0.3s;

    @media (max-width: 900px) {
      flex-direction: column;
      margin-bottom: 10px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 10px 0px;
      width: 80%;
    }

    &:hover {
      scale: 1.1;
      transition: all ease-in-out 0.3s;
      background-color: ${white};
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

    .widget-icon {
      display: flex;
      flex-direction: column;
      justify-content: center !important;
      align-items: center !important;
      color: ${darkBlue};
      height: 100%;
      width: 40%;
      @media (max-width: 900px) {
        width: 100%;
      }
    }

    .widget-body {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media (max-width: 900px) {
        width: 100%;
      }
    }

    .widget-title {
      margin: 0px;
      font-weight: bold;
      font-size: 23px;
      margin-bottom: 3px;
      color: ${darkBlue};
      @media (max-width: 900px) {
        text-align: center;
      }
    }
    .widget-subtitle {
      margin: 0px;
      font-size: 16px;
      color: ${darkBlue};
      @media (max-width: 900px) {
        text-align: center;
      }
    }
  }
`;
