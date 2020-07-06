import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";

/**
 *
 * @param label
 * @param value
 * @returns {*}
 * @constructor 
 */
function AutoFillField({label, value = ""}) {

    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    minWidth: 60,
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text>
             
            <View style={[styles.inputWrapper, {
                paddingRight: value ? 4 : 0,
            }]}>
                <View style = {styles.inputField}>
                    <Text>{value}</Text>
                </View>
            </View>
        </View>
    );
}

AutoFillField.propTypes = {};
AutoFillField.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        flex: 1,
        height: 32,
    },
    inputField: {
        // flex: 1,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
        justifyContent:'center'
    },
});

export default AutoFillField;
