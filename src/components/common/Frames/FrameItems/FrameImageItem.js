import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function FrameImageItem({
    image = {}
}){ 
    const theme = useTheme();

    const FrameImageItemWrapper = styled.View`
        width : 100%;
        height : 340px;
    `;
    const FrameImageItemContainer = styled.View`
        height : 100%;
        border : 1px solid ${theme.colors['--color-gray-400']};
        border-radius : 4px;
        background-color : ${theme.colors['--color-gray-300']};
    `;

    const TitleWrapper = styled.View`
        width : 100%;
        height : 30px;
    `;
    const TitleContainer = styled.View`
        width : 100%;
        height : 100%;
        background-color : ${theme.colors['--default-shade-white']};
        border-bottom-color : ${theme.colors['--color-gray-400']};
        border-bottom-width:1px;
        border-top-left-radius:4px;
        border-top-right-radius:4px;
        justify-content: center;
        padding-right : ${theme.space['--space-12']};
        padding-left : ${theme.space['--space-12']};
    `;
    const ImageTitle = styled.Text({
        ...theme.font['--text-sm-medium'],
        color : theme.colors['--color-blue-600'],
    });

    const ImageWrapper = styled.View`
        width: 100%;
        flex:1;
        padding-left : ${theme.space['--space-56']};
        padding-right : ${theme.space['--space-56']};
    `;
    const ImageContainer = styled.View`
        width : 100%;
        height: 100%;
        justify-content : center;
        align-items: center;
 
    `;

    return(
        <FrameImageItemWrapper>
            <FrameImageItemContainer>

                <TitleWrapper>
                    <TitleContainer>
                        <ImageTitle>{image.name}</ImageTitle>
                    </TitleContainer>
                </TitleWrapper>

                <ImageWrapper>
                    <ImageContainer>
                        <Image source={require('../../../../../assets/icon.png')}/>
                    </ImageContainer> 
                </ImageWrapper>

            </FrameImageItemContainer>
        </FrameImageItemWrapper>
    )
    
}

export default FrameImageItem

const styles = StyleSheet.create({
    container:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#F8FAFB',
        alignItems:'flex-start',
        justifyContent:'center',
        margin:15
    },
    titleContainer:{
        backgroundColor:"#FFFFFF",
        flex:1,
        width:"100%",
        borderBottomColor:"#CCD6E0",
        borderBottomWidth:1,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        padding:7
    },
    title:{
        fontSize:14,
        color:'#3182CE'
    },
    image:{
        flex:1,
        width:'100%',
        alignItems:'center',
        backgroundColor:'#E3E8EF',
        borderColor:'#CCD6E0',
        justifyContent:"center",
        alignSelf:'center',
        paddingLeft:20,
        paddingRight:20
        //borderWidth:1,
    }
})
