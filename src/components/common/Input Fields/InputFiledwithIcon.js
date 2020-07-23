import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import ClearIcon from "../../../../assets/svg/clearIcon";

/**
 *
 * @param label
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param onClear
 * @returns {*}
 * @constructor
 */
function InputFieldwithIcon({label, onChangeText, value, placeholder, keyboardType, onClear, icon, secureTextEntry}) {

    return (
        <View style={styles.container}>
            <Text style={[styles.textLabel]}>{label}</Text>

            <View style={[styles.inputWrapper, {paddingRight: value ? 4 : 0}]}>
                <TextInput
                    style={[styles.inputField,{}]}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    secureTextEntry = {secureTextEntry}
                />
                <View style={{marginRight:5, justifyContent:'center'}}>
                    {icon}
                </View>
            </View>




        </View>
    );
}

InputFieldwithIcon.propTypes = {};
InputFieldwithIcon.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
        marginBottom:8
    },
    inputWrapper: {
        flex: 1,
        flexDirection:'row',
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        justifyContent:'center'
    },
    inputField: {
        flex: 1,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 5
    }
});

export default InputFieldwithIcon;
