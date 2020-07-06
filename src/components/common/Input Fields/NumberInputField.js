import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Text} from "react-native";

function NumberInputField({label, onChangeText, value, placeholder}) {

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
                    value={value}
                    onChangeText={value => {
                        if (/^\d+$/g.test(value) || !value) {
                            onChangeText(value)
                        }
                    }}
                    keyboardType={'number-pad'}
                    placeholder={placeholder}
                />
            </View>
        </View>
    );
}

NumberInputField.propTypes = {};
NumberInputField.defaultProps = {};

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

export default NumberInputField;
