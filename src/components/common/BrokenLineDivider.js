import React from 'react';
import {View, Text} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const DividerWrapper = styled.View`
    width : 100%;
`;
const DividerContainer = styled.View`
    height :0px;
    border-width: 1px;
    border-color: ${ ({theme}) => theme.colors['--color-gray-300']};
    border-style : dashed;
    border-radius : 1px;
`;

function BrokenLineDivider(){
    const theme = useTheme();

    return (
        <DividerWrapper>
            <DividerContainer theme = {theme}/>
        </DividerWrapper>
    )
}

export default BrokenLineDivider
