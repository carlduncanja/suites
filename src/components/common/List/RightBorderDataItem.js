import React from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {Text} from 'react-native';

const DataItemWrapper = styled.View` 
    flex: ${({flex}) => flex.toString()};
    height: 100%;
    padding-top: ${({theme}) => theme.space['--space-12']};
    padding-bottom: ${({theme}) => theme.space['--space-12']};
`;
const DataItemContainer = styled.View` 
    display: flex;
    width:95%;
    height: 100%; 
    justify-content: center;
    align-items: ${({align}) => align};
    border-right-width : 1px; 
    border-right-color : ${({theme}) => theme.colors['--color-gray-300']};

`;

const DataText = styled.Text(({theme, fontStyle, color}) => ({
    ...theme.font[fontStyle],
    color: theme.colors[color],
    paddingTop: 2,
    paddingRight: 4,
}));

function RightBorderDataItem({text = '', flex = 1, align = 'flex-start', fontStyle = '--text-sm-regular', color = '--color-gray-700',}) {
    const theme = useTheme();

    return (
        <DataItemWrapper flex={flex} theme={theme}>
            <DataItemContainer align={align} theme={theme}>
                <DataText numberOfLines={1} fontStyle={fontStyle} color={color} theme={theme}>{text}</DataText>
            </DataItemContainer>
        </DataItemWrapper>
    );
}

export default RightBorderDataItem;
