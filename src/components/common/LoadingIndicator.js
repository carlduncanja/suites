import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const Container = styled.View`

  display: flex;
  
`

function LoadingIndicator({size = 'large', color}){

    const theme = useTheme();

    return (
        <Container>
            <ActivityIndicator style={{alignSelf: 'center'}} size={size} color={color ? color : theme.colors['--company'] }/>
        </Container>
    )
}

export default LoadingIndicator