import React from 'react';
import Header from 'components/Header/index';
import { StyledContainer, StyledBox, LinkButton } from './styles';
import Title from 'components/Title/index.jsx';
import Subtitle from 'components/Subtitle/index.jsx';
import Button from 'components/Button/index.jsx';

function Home() {
    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Title marginBottom='20px' fontSize='60px'>Domine seu trabalho, organize sua vida</Title>

                    <Subtitle fontSize='22px'>Lembre-se de tudo e enfrente cada projeto com suas notas, tarefas e calendário, tudo no mesmo lugar.</Subtitle>

                    <Button outlined width='200px' marginTop='20px'>Cadastre-se</Button>

                    <div style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '20px',
                        color: '#fff'
                    }}>
                        <p> Já tem uma conta?</p>
                        <LinkButton>Entre</LinkButton>
                    </div>

                </StyledBox>
            </StyledContainer>
        </>
    );
}

export default Home;