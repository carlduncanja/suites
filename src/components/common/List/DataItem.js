import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

function DataItem({text = "", flex = 1, align = 'flex-start', fontStyle = '--text-sm-regular', color = '--color-gray-700', }){
    const theme = useTheme();
    const DataItemWrapper = styled.View`
        flex: ${flex.toString()};
        height: 100%;
    `;
    const DataItemContainer = styled.View`
        display: flex;
        height:100%;
        justify-content: center;
        align-items: ${align};
    `;

    const DataText = styled.Text({
        ...theme.font[fontStyle],
        color : theme.colors[color],
    })
    return (
        <DataItemWrapper>
            <DataItemContainer>
                <DataText>{text}</DataText>
            </DataItemContainer>
        </DataItemWrapper>
    )
}

export default DataItem

