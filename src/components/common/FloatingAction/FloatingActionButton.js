import React,{Component, useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon';
import ActionMenu from '../../../../assets/svg/actionMenu';
import { withModal } from 'react-native-modalfy';
 
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';  
import MultipleShadowsContainer from '../MultipleShadowContainer';

const FloatingActionButtonWrapper = styled.TouchableOpacity`
    height : 48px;
    width: 48px;
`;

const FloatingActionButtonContainer = styled.View`
    height: 100%;
    width: 100%;
    background-color: ${ ({hasActions, isDisabled, theme}) => hasActions ? 
        isDisabled ? theme.colors['--color-gray-500'] : theme.colors['--color-blue-500']
        :
        theme.colors['--default-shade-white']
    };
    border : ${ ({hasActions, theme}) => hasActions ? 
        null
        :
        `1px solid ${theme.colors['--color-gray-300']}`
    };
    border-radius: 50%;
    align-items: center;
    justify-content: center;

`;

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 15
      },
      {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 6
      },
]

function FloatingActionButton ({isDisabled = false,toggleActionButton = ()=>{}, hasActions = true}){

    const theme = useTheme();

    

    return (
        <MultipleShadowsContainer shadows = {shadows} hasShadow = {!hasActions ? false : true }>
            <FloatingActionButtonWrapper onPress={()=>toggleActionButton()}>
                <FloatingActionButtonContainer hasActions = {hasActions} isDisabled = {isDisabled} theme = {theme}>
                    <ActionMenu
                        fillColor = {
                            hasActions ? 
                                theme.colors['--default-shade-white']
                                :
                                theme.colors['--color-gray-400']
                        }
                    />
                </FloatingActionButtonContainer>
            </FloatingActionButtonWrapper>
        </MultipleShadowsContainer>
        
        
    );
} 

export default withModal(FloatingActionButton);

const styles = StyleSheet.create({
    container:{
        height:48,
        width:48,
        borderRadius:30,
        borderWidth:1,
        borderColor:'#E3E8EF',
        //backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center'
    }
})
