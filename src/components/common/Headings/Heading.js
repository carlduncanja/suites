import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';    
import OverlayButton from '../OverlayButtons/OverlayButton';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Button from '../Buttons/Button';
import OverlayButtonContainer from '../OverlayButtons/OverlayButtonContainer';

function Heading({headerIdColor, headerId, headerNameColor, headerName, message, button}){ 
    const theme = useTheme();

    const HeadingWrapper = styled.View`
        margin-left : ${theme.space['--space-24']};
        margin-right : ${theme.space['--space-24']};
        margin-bottom : ${theme.space['--space-16']};
    `
    const HeadingContainer = styled.View`
        flex-direction : column; 
    `

    const HeaderId = styled.Text({
        ...theme.font['--text-base-medium'],
        color : headerIdColor ? headerIdColor : theme.colors['--company']
    })
    
    const HeaderNameContainer = styled.View`
        display:flex;
        padding-top : ${theme.space['--space-10']};
        flex-direction : row;
        justify-content : space-between;
        align-items : center;
    `
    const HeaderName = styled.Text({
        ...theme.font['--text-xl-medium'],
        color : headerNameColor ? headerNameColor : theme.colors['--accent-button']
    })


    return (
        <HeadingWrapper>
            <HeadingContainer>
                <HeaderId>{headerId}</HeaderId>
                <HeaderNameContainer>
                    <HeaderName>{headerName}</HeaderName>
                    <OverlayButtonContainer
                        message = {message}
                        button = {button}
                    />
                </HeaderNameContainer>

            </HeadingContainer>
        </HeadingWrapper>
    )
}

export default Heading

const styles = StyleSheet.create({
    container:{
        // borderTopLeftRadius:30,
        // borderTopRightRadius:30,
        flexDirection:'column',
        padding:20,
        paddingBottom:25,
    },
    titleButtonRow:{
        flexDirection:'row',
        justifyContent:"space-between",
    },
    button:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    message:{
        fontSize:16,
        color:'#FFFFFF',
        paddingRight:8
    }
})