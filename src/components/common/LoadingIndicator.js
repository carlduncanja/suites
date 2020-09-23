import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const LoadingIndicatorWrapper = styled.View`
    // margin-top: ${({theme}) => theme.space['--space-20']}
    position: absolute;
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
    z-index: 10;
`;

const LoadingIndicatorContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({backgroundColor}) => (backgroundColor || 'none')};
`;

function LoadingIndicator({size = 'large', color, backgroundColor}) {
    const theme = useTheme();

    return (
        <LoadingIndicatorWrapper theme={theme}>
            <LoadingIndicatorContainer theme={theme} backgroundColor={backgroundColor}>
                <ActivityIndicator
                    style={{alignSelf: 'center'}}
                    size={size}
                    color={color || theme.colors['--company']}
                />
            </LoadingIndicatorContainer>
        </LoadingIndicatorWrapper>

    );
}

export default LoadingIndicator;
