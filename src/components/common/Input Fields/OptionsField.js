import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import DropDownIcon from "../../../../assets/svg/dropDown";
import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';
import InputContainerComponent from '../InputContainerComponent';
import InputLabelComponent from '../InputLablel';
import InputErrorComponent from '../InputErrorComponent';


const TextInputWrapper = styled.View`
    flex:1;
    //height : 32px;
`;
const TextInputContainer = styled.View`
    height : 100%;
    width : 100%;
    min-height: 32px;
    border-width: 1px;
    padding-left : ${ ({theme}) => theme.space['--space-10'] };
    padding-right : ${ ({theme}) => theme.space['--space-10'] };
    
    border-color: ${ ({theme, hasError}) =>  hasError ? theme.colors['--color-red-600'] : theme.colors['--color-gray-300']};
    background-color : ${ ({theme, backgroundColor}) => backgroundColor ? theme.colors[backgroundColor] : theme.colors['--default-shade-white']};
    border-radius: 4px;
    box-shadow : ${ ({isFocussed, theme}) => isFocussed ? theme.shadow['--shadow-lg'] : null};
`;

const SelectedValue = styled.Text( ({theme}) => ({
    ...theme.font['--text-sm-regular'],
    color : theme.colors['--color-gray-900'],
}));

const Input = styled.View`
    height: 100%;
    width : 100%;
    flex-direction : row;
    align-items : center;
    justify-content : space-between;
`;

const Error = styled.View`
    position : absolute;
`;


function OptionsField({oneOptionsSelected, text, label, menuOption, hasError = false, errorMessage = ""}) {

    const theme = useTheme();
    return (

        <InputContainerComponent>

            {
                label && <InputLabelComponent label = {label}/>
            }

            <Menu onSelect={oneOptionsSelected} style={{flex: 1}}>
                <MenuTrigger>

                    <TextInputWrapper>
                        <TextInputContainer theme = {theme} hasError = {hasError}>

                            <Input>
                                <SelectedValue>{text}</SelectedValue>
                                <DropDownIcon/>
                            </Input>

                            {
                                hasError &&
                                <Error>
                                    <InputErrorComponent errorMessage = {errorMessage}/>
                                </Error>
                                // <View style={styles.errorView}>
                                //     <Text style={{fontSize: 10, color: 'red'}}>{"errorMessage"}</Text>
                                // </View>
                            }



                        </TextInputContainer>
                    </TextInputWrapper>


                    {/* <>
                        <View style={[styles.inputField, {borderColor: hasError ? 'red' : '#E3E8EF'}]}>
                            <Text>{text}</Text>
                            <DropDownIcon/>
                        </View>
                        {
                            hasError &&
                            // <InputErrorComponent errorMessage = {errorMessage}/>
                            <View style={styles.errorView}>
                                 <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
                            </View>
                        }
                    </> */}

                </MenuTrigger>
                {
                    menuOption
                }
            </Menu>

        </InputContainerComponent>
    );
}

OptionsField.propTypes = {};
OptionsField.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        alignItems: 'center',
    },
    inputField: {
        // flex: 1,
        // width: '100%',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#E3E8EF',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        height: 32,
    },
    errorView: {
        position:'absolute',
        top:32,
        paddingTop: 3,
        paddingLeft: 15

    }
});

export default OptionsField;
