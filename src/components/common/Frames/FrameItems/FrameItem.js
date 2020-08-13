import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconButton from '../../Buttons/IconButton';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const FrameItemWrapper = styled.View`
    width: 100%;
    display:flex;
    margin-bottom : ${ ({theme}) => theme.space['--space-12']};
`;
const FrameItemContainer = styled.View`

    width : 100%;
    flex-direction : row;
    border : 1px solid ${ ({theme}) => theme.colors['--color-gray-400']};
    border-radius : 4px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
    padding-top: ${ ({theme}) => theme.space['--space-8']};
    padding-bottom: ${ ({theme}) => theme.space['--space-8']};
    padding-left: ${ ({theme}) => theme.space['--space-10']};
    padding-right: ${ ({theme}) => theme.space['--space-10']};
`;

const FrameItemContent = styled.Text( ({theme}) => ({
    ...theme.font['--text-base-regular'],
    color : theme.colors['--color-gray-900']

}));


function FrameItem ({itemContent = "", icon, backgroundColor = "#FFFFFF", onPressButton = ()=>{}}, isEditMode = false) {
    
    const theme = useTheme();
    
    return (
        <FrameItemWrapper theme = {theme}> 
            <FrameItemContainer theme = {theme}>
                <FrameItemContent theme = {theme}>{itemContent}</FrameItemContent>
                {/* {
                    isEditMode && <IconButton Icon = {icon} onPress = {onPressButton} />
                } */}
            </FrameItemContainer>
            
        </FrameItemWrapper>
    ) 
}
export default  FrameItem 
  
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:"#FFFFFF",
        borderRadius:4,
        alignItems:'center',
        justifyContent:'space-between',
        padding:5
    },
    text:{
        fontSize:16, 
        color:'#1D2129',
        //fontFamily:'Metropolis'
    }
})