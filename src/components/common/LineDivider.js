import React from 'react';
import {View, Text} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const DividerWrapper = styled.View`
    width : 100%;
`;
const DividerContainer = styled.View`
    height: ${ ({theme}) => theme.space['--space-2']};
    border-bottom-width: 1px;
    border-bottom-color: ${ ({theme}) => theme.colors['--color-gray-300']};
`;

function LineDivider(){
    const theme = useTheme();
    
    return (
        <DividerWrapper>
            <DividerContainer theme = {theme}/>
        </DividerWrapper>
    )
}

export default LineDivider