import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
    overflow: hidden;
    padding-right: 80px;
    padding-left: 80px;
    padding-top: 30px;

    @media (max-width: 1000px) {
        padding-right: 0px;
        padding-left: 0px;
    }
`;