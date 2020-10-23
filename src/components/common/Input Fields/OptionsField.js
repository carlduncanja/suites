import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import DropDownIcon from "../../../../assets/svg/dropDown";
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';
import InputContainerComponent from '../InputContainerComponent';
import InputLabelComponent from '../InputLablel';
import InputErrorComponent from '../InputErrorComponent';


const TextInputWrapper = styled.View`
    flex:1;
`;

const TextInputContainer = styled.View`
    height : 100%;
    width : 100%;
    min-height: 32px;
    border-width: 1px;
    padding-left : ${({theme}) => theme.space['--space-10']};
    padding-right : ${({theme}) => theme.space['--space-10']};
    
    border-color: ${({theme, hasError}) => theme.colors['--color-gray-300']};
    background-color : ${({theme, enabled}) => !enabled ? theme.colors['--color-gray-100'] : theme.colors['--default-shade-white']};
    border-radius: 4px;
    box-shadow : ${({isFocussed, theme}) => isFocussed ? theme.shadow['--shadow-lg'] : null};
`;

const SelectedValue = styled.Text(({theme}) => ({
    ...theme.font['--text-sm-regular'],
    color: theme.colors['--color-gray-900'],
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


function OptionsField({oneOptionsSelected, labelWidth, enabled = true, text, label, menuOption, hasError = false, errorMessage = ""}) {

    const theme = useTheme();
    return (

        <InputContainerComponent>

            {
                label && <InputLabelComponent width={labelWidth} label={label}/>
            }

            <TextInputWrapper>
                <Menu disabled={!!enabled} onSelect={oneOptionsSelected} style={{flex: 1}}>
                    <MenuTrigger disabled={!enabled}>
                        <TextInputContainer theme={theme} hasError={hasError} enabled={enabled}>

                            <Input>
                                <SelectedValue>{text}</SelectedValue>
                                <DropDownIcon/>
                            </Input>

                            {
                                hasError &&
                                <Error>
                                    <InputErrorComponent errorMessage={errorMessage}/>
                                </Error>
                            }
                        </TextInputContainer>
                    </MenuTrigger>
                    {
                        menuOption
                    }
                </Menu>
            </TextInputWrapper>

        </InputContainerComponent>
    );
}

OptionsField.propTypes = {};
OptionsField.defaultProps = {};

export default OptionsField;
