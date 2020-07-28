import React from 'react';
import {View, Text} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function LineDivider(){
    const theme = useTheme();
    const DividerWrapper = styled.View`
        width : 100%;
    `
    const DividerContainer = styled.View`
        height: ${theme.space['--space-2']};
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors['--color-gray-300']};
    `
    return (
        <DividerWrapper>
            <DividerContainer/>
        </DividerWrapper>
    )
}

export default LineDivider