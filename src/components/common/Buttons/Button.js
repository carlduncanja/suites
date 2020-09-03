import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const ButtonWrapper = styled.TouchableOpacity`
        height: 100%;
        width: 100%;
        padding-right: 8px;
        padding-left: 8px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
`;

const ButtonContainer = styled.View`
        position: relative;
        height: 100%;
        width: 100%;
        
        justify-content: center;
        align-items: center;
        background-color:${(backgroundColor,) => backgroundColor};
`;

const ButtonTitle = styled.Text(({theme, font, color}) => ({
    ...theme.font[font],
    color: color ? color : theme.colors['--accent-button'],
}))

const IconWrapper = styled.Text`
  //position: absolute;
  //right: 0px;
  margin-top: 6px;
`


const Button = ({backgroundColor, buttonPress, disabled, color, title, font = '--text-sm-medium', Icon}) => {
    const theme = useTheme();

    console.log("Icon", Icon);

    return (
        <ButtonWrapper theme={theme} onPress={buttonPress} disabled={disabled}>
            <ButtonContainer theme={theme} backgroundColor={backgroundColor}>
                <ButtonTitle theme={theme} font={font} color={color}>{title}</ButtonTitle>


            </ButtonContainer>

            {
                Icon &&
                <IconWrapper>{Icon}</IconWrapper>
            }

        </ButtonWrapper>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        //backgroundColor:'#F7FAFC',
        //borderRadius:4,
        //borderWidth:1,
        // borderColor:'#CBD5E0',
        alignItems: 'center',
        justifyContent: 'center',
        //padding:10,
        alignSelf: 'center',
        //padding:5,
        //width:91,
        //height:24,

    },
    buttonText: {
        //color: '#4A5568',
    },
})
