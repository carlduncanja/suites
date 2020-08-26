import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

const DataItemWrapper = styled.View` 
    flex: ${ ({flex}) => flex.toString()}; 
    height: 100%;
    margin-right: ${ ({theme}) => theme.space['--space-4']};
`;
const DataItemContainer = styled.View` 
    display: flex;
    height:100%; 
    justify-content: ${ ({align}) => align};
    /* align-items: ${ ({align}) => align}; */
    align-items:center;
    flex-direction : row;
`;

const DataText = styled.Text( ({theme, fontStyle, color, icon}) => ({
    ...theme.font[fontStyle],
    color : theme.colors[color],
    paddingLeft : icon ? 6 : 0,
}))


function DataItemWithIcon({text = "", flex = 1, align = 'flex-start', fontStyle = '--text-sm-regular', color = '--color-blue-600', icon = ()=>{} }){
    const theme = useTheme();

    return (
        <DataItemWrapper flex = {flex} theme={theme}>
            <DataItemContainer align = {align}>
                {icon}
                <DataText numberOfLines = {1} fontStyle = {fontStyle} color = {color} theme = {theme} icon = {icon}>{text}</DataText>
            </DataItemContainer>
        </DataItemWrapper>
    )
}

export default DataItemWithIcon

