import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const Button = ({backgroundColor, buttonPress, color, title, fontSize = 12, fontWeight = 'normal'}) => {

    const theme = useTheme();

    const ButtonWrapper = styled.TouchableOpacity`
        height: 100%;
        width: 100%; 
    `;

    const ButtonContainer = styled.View`
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        background-color : ${backgroundColor ? backgroundColor : theme.colors['--accent-button']};
    `

    const ButtonTitle = styled.Text({
        ...theme.font['--text-sm-medium'],
        color : color ? color : theme.colors['--accent-button']
    })
    return (
        
        <ButtonWrapper onPress={buttonPress}>
            <ButtonContainer>
                <ButtonTitle>{title}</ButtonTitle>
            </ButtonContainer> 
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
