import React,{  } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import RightArrow from '../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../assets/svg/leftArrow';
import IconButton from '../Buttons/IconButton';

import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

const ChangeFieldWrapper = styled.View` 
    flex: ${ ({flex}) => flex.toString()};
    height: 100%;
    margin-right: ${ ({theme}) => theme.space['--space-4']};

`;
const ChangeFieldContainer = styled.View` 
    display: flex;
    height:100%; 
    justify-content: center;
    align-items: ${ ({align}) => align};
    flex-direction : row;

`;

const NumberContainer = styled.TextInput`
    border-color : ${ ({borderColor, theme}) => theme.colors[borderColor]};
    background-color : ${ ({backgroundColor, theme}) => theme.colors[backgroundColor] };
    border-width : 1px;
    border-radius : 4px;
    padding : ${ ({theme}) => theme.space['--space-6']};
    padding-top : ${ ({theme}) => theme.space['--space-2']};
    padding-bottom : ${ ({theme}) => theme.space['--space-2']};
`;
const IconContainer = styled.View`
    height : 100%;
    align-items:center;
`;


function NumberChangeField({ 
    onChangePress = () => {}, 
    onAmountChange = () => {}, 
    value=0, 
    backgroundColor = '--color-gray-100',
    borderColor = '--color-gray-400',
    flex = 1,
    align = "center" 
}){
    return ( 
 
        <ChangeFieldWrapper flex = {flex} >
            <ChangeFieldContainer align = {align}>

                <IconContainer>
                    <IconButton
                        Icon = {<LeftArrow strokeColor = {'#718096'}/>}
                        onPress = {()=>onChangePress('sub')}
                        disabled = {false}
                    />
                </IconContainer>
            
                <NumberContainer 
                    backgroundColor = {backgroundColor}
                    borderColor = {borderColor}
                    onChangeText = {(value)=>onAmountChange(value)}
                    value = {value}
                    keyboardType = "numeric"
                />
                <IconContainer>
                    <IconButton
                        Icon = {<RightArrow strokeColor="#718096"/>}
                        onPress = {()=>{onChangePress('add')}}
                        disabled = {false}
                    />
                </IconContainer>

            </ChangeFieldContainer>
        </ChangeFieldWrapper>
    )
}

export default NumberChangeField

const styles = StyleSheet.create({
    inputWrapper:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red'
    },
    editTextBox:{
        // backgroundColor:'#F8FAFB',
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        padding:6,
        paddingTop:2,
        paddingBottom:2,
        // marginLeft:10,
        // marginRight:10
    },
    inputField : {
        height:30,
        width:30,
        borderWidth:1,
        borderRadius:4,
        // padding:5,
        // paddingBottom:2,
        // paddingTop:2,
        marginLeft:8,
        marginRight:8,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontWeight:'500',
        fontSize:16,
        color:'#4A5568'
    }
})