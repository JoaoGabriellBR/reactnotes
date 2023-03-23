import styled from "styled-components";
import { green, darkBlue } from "styles/colorProvider";
import background from '../../assets/backgroundnotes.jpg';

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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const LeftBox = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url(${background});
  background-position: left center;
  background-color: #000000;
  background-size: cover;
  background-repeat: no-repeat;
  
  &&:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: ${darkBlue};
    opacity: 0.8;
  }

  @media (max-width: 1000px) {
    display: none;
  }

  .logo {
    width: 250px;
    height: 250px;
    position: relative;
  }
`;

export const RightBox = styled.div`
  background-color: #fff;
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    width: 100%;
  }

  .registrar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  min-height: 550px;
  width: 85%;

  @media (max-width: 1000px) {
    margin-bottom: 25px;
  }

  .input-form {
    width: 65%;
    height: 55px;
    margin-bottom: 1.3rem;

    @media (max-width: 1000px){
      width: 80%;
    }
  }
`;

export const LinkButton = styled.p`
    color: #000;
    text-decoration: none;
    cursor: pointer;
    margin-left: 5px;

    &&:hover {
        color: ${green};
    }
`;
