import React from 'react'
import styled, { css } from '@emotion/native';
 
const Container = styled.View`
  display: flex;
`

function Wrapper({children}){
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Wrapper