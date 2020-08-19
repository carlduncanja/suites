import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';
import { View } from 'react-native-animatable';

const DataItemWrapper = styled.View` 
     flex: ${ ({ flex }) => flex.toString()};
    height: 100%;
    
`;
const DataItemContainer = styled.View`
    display: flex;
    flex-direction:row;
    height:100%;
    align-items: center;
 
`;

const DraftIconContainer = styled.View`
height:15px;
width:35px;
background-color:${({ theme }) => theme.colors["--color-orange-600"]};
border-radius:2px;
align-items:center;
padding:2px;
margin-left:10px;

`;

const GeneralText = styled.Text`
color:${({ theme }) => theme.colors["--default-shade-white"]};
font:${({ theme }) => theme.font["--text-xs-regular"]};
align-self:center;

`;

const DataText = styled.Text(({ theme, fontStyle, color }) => ({
    ...theme.font[fontStyle],
    color: theme.colors[color],
}))


function DraftItem({ text = "", flex = 1, align = 'flex-start', fontStyle = "--text-base-medium", color = '--color-gray-700' }) {
    const theme = useTheme();

    return (
        <DataItemWrapper flex={flex}>
            <DataItemContainer align={align}>
                <DataText fontStyle={fontStyle} color={color} theme={theme}>{text}</DataText>
                <DraftIconContainer theme={theme}>
                    <GeneralText theme={theme}>Draft</GeneralText>
                </DraftIconContainer>
            </DataItemContainer>


        </DataItemWrapper>
    )
}

export default DraftItem;

