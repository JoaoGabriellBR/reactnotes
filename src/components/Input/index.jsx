import React from 'react';
import { StyledInput } from './styles';

function Input({children, ...props}) {
    <StyledInput {...props}>
        {children}
    </StyledInput>
};

export default Input;