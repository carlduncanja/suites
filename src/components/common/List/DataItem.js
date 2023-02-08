import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

const DataItemWrapper = styled.View` 
    flex: ${ ({flex}) => flex.toString()};
    height: 100%;
`;
// margin-right: ${ ({theme}) => theme.space['--space-4']};
const DataItemContainer = styled.View` 
    display: flex;
    height:100%; 
    justify-content: center;
    align-items: ${ ({align}) => align};
`;

const DataText = styled.Text( ({theme, fontStyle, color}) => ({
    ...theme.font[fontStyle],
    color: theme.colors[color],
    paddingTop: 2,
    paddingRight: '11%',
    width: '100%'
}));

function DataItem({text = "", flex = 1, align = 'flex-start', width = {width}, fontStyle = '--text-sm-regular', color = '--color-gray-700', }) {
    const theme = useTheme();
    
    return (
        <DataItemWrapper flex={flex} theme={theme}>
            <DataItemContainer align={align}>
                <DataText numberOfLines={1} fontStyle={fontStyle} color={color} theme={theme}>{text}</DataText>
            </DataItemContainer>
        </DataItemWrapper>
    );
}

export default DataItem;
