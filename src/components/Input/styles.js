import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const StyledInput = styled(TextField)`
  border: 5px solid red;
  width: 100%;
  height: 45px;

  @media (max-width: 1000px) {
    width: 100%;
  }

`;