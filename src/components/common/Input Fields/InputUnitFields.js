import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";
import InputContainerComponent from '../InputContainerComponent';
import InputLabelComponent from '../InputLablel';
import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';
import InputErrorComponent from '../InputErrorComponent';

/**
 *
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param units
 * @returns {*}
 * @constructor
 */

const TextInputWrapper = styled.View`
    flex:1;
    height : 32px;
`;
const TextInputContainer = styled.View`
    height : 100%;
    width : 100%;
    border-width: 1px;
    border-color: ${ ({theme, hasError}) =>  hasError ? theme.colors['--color-red-600'] : theme.colors['--color-gray-300']};
    background-color : ${ ({theme, enabled}) => !enabled ? theme.colors['--color-gray-100'] : theme.colors['--default-shade-white']};
    border-radius: 4px;
`;

const InputContainer = styled.View`
    flex:1;
    flex-direction : row;
`;

const Input = styled.TextInput`
    flex:1;
    padding-left : ${ ({theme}) => theme.space['--space-10']};  
`;

const UnitContainer = styled.View`
    width : 50px;
    background-color : ${ ({theme}) => theme.colors['--color-gray-100']};
    align-items : center;
    justify-content : center;
    border-left-width : 1px;
    border-top-right-radius : 4px;
    border-bottom-right-radius : 4px;
    border-color : ${ ({theme}) => theme.colors['--color-gray-300']};
`;

const Unit = styled.Text( ({theme}) => ({
    ...theme.font['--text-sm-regular'],
    color : theme.colors['--color-black']
}));

function InputUnitField({label, labelWidth, onChangeText, value,enabled = true, placeholder, keyboardType, units, hasError = false, errorMessage = "" }) {

    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedUnit, setSelectedUnit] = useState(units[selectedIndex])

    const changeUnit = () => {

        if (units.length - 1 === selectedIndex){
            setSelectedIndex(0)
            setSelectedUnit(units[0])
        }else{
            setSelectedIndex(selectedIndex + 1)
            setSelectedUnit(units[selectedIndex + 1])
        }
    }

    return (
        <InputContainerComponent>

            {
                label && <InputLabelComponent width={labelWidth} label = {label}/>
            }

            <TextInputWrapper>
                <TextInputContainer theme = {theme} enabled={enabled}>

                    <InputContainer>
                        <Input
                            editable={enabled}
                            theme = {theme}
                            onChangeText={onChangeText}
                            value={value?.toString()}
                            keyboardType={keyboardType}
                            placeholder={placeholder}
                        />
                        <UnitContainer theme = {theme}>
                            <Unit>{selectedUnit}</Unit>
                        </UnitContainer>
                    </InputContainer>


                    {
                        hasError && <InputErrorComponent errorMessage = {errorMessage}/>
                    }

                </TextInputContainer>
            </TextInputWrapper>

        </InputContainerComponent>

    );
}

InputUnitField.propTypes = {};
InputUnitField.defaultProps = {};


export default InputUnitField;
