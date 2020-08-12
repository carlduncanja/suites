import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const LoadingIndicatorWrapper = styled.View`
    // margin-top: ${({theme}) => theme.space['--space-20']}
    display: flex;
    flex: 1
`

const LoadingIndicatorContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

function LoadingIndicator({size = 'large', color}) {

    const theme = useTheme();

    return (
        <LoadingIndicatorWrapper theme={theme}>
            <LoadingIndicatorContainer theme={theme}>
                <ActivityIndicator
                    style={{alignSelf: 'center'}} size={size}
                    color={color ? color : theme.colors['--company']}
                />
            </LoadingIndicatorContainer>
        </LoadingIndicatorWrapper>

    )
}

export default LoadingIndicator
