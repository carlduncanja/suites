import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Text} from "react-native";

function InputField2({label, onChangeText, value, placeholder, keyboardType}) {
    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text>

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inputField}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                />
            </View>
        </View>
    );
}

InputField2.propTypes = {};
InputField2.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
    },
    inputField: {
        flex: 1,
        padding: 12,
        paddingTop: 9,
        paddingBottom: 9
    }
});

export default InputField2;
