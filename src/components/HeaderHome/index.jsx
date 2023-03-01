// import 'rbx/index.css';
// import { Container } from 'rbx';
import Logo from '../../assets/logo.png';
import Title from 'components/Title/index';
import { StyledHeader } from './styles';

export default function HeaderHome() {
  return (
      <StyledHeader>
        <img width='30px' height='35px' src={Logo} alt="Logo React Notes" />
        <Title marginRight='10px' fontSize='18px'>React Notes</Title>
      </StyledHeader>
  );
}
