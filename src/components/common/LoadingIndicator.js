import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function LoadingIndicator({size = 'large', color}){ 

    const theme = useTheme();

    const LoadingIndicatorWrapper = styled.View`
        margin-top: ${theme.space['--space-20']}
    `

    const LoadingIndicatorContainer= styled.View`
        display: flex;
    `

    return (
        <LoadingIndicatorWrapper>
            <LoadingIndicatorContainer>
                <ActivityIndicator style={{alignSelf: 'center'}} size={size} color={color ? color : theme.colors['--company'] }/>
            </LoadingIndicatorContainer>
        </LoadingIndicatorWrapper>
       
    )
}

export default LoadingIndicator