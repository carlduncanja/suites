import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from "react-native";
import RemoveIcon from "../../../../../assets/svg/remove2";
import IconButton from '../../Buttons/IconButton';

/**
 *
 * @param onChangeText
 * @param value
 * @param placeholder
 * @param keyboardType
 * @param onClear
 * @returns {*}
 * @constructor
 */
function InputFrameItem({onChangeText, value, placeholder = "", keyboardType, onClear}) {

    return (
        <View style={styles.container}>

            <View style={[styles.inputWrapper, {paddingRight: value ? 4 : 0}]}>
                <TextInput
                    style={[styles.inputField,{}]}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                />
                
                <View style={{marginRight:5, justifyContent:'center'}}>
                   <IconButton
                    Icon ={<RemoveIcon/>}
                    onPress = {onClear}
                   />
                </View>

            </View>

        </View>
    );
}

InputFrameItem.propTypes = {};
InputFrameItem.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        // marginBottom:12,
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
        flex:1,
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:"#FFFFFF",
        borderRadius:4,
        alignItems:'center',
        justifyContent:'space-between',
        padding:5,
        flexDirection:'row',
        height: 32,
    },
    inputField: {
        flex: 1,
        fontSize:16,
        color:'#1D2129'
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        margin: 5
    }
});

export default InputFrameItem;
