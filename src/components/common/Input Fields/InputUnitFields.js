import React,{ useState } from 'react';
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
 * @param units
 * @returns {*}
 * @constructor
 */
function InputUnitField({label, onChangeText, value, placeholder, keyboardType, units }) {

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
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text>

            <View style={[styles.inputWrapper]}>
                <TextInput
                    style={styles.inputField}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                />
                <TouchableOpacity 
                    onPress={()=>changeUnit()}
                    style={{
                        backgroundColor:"#F8FAFB", 
                        alignItems:'center', 
                        justifyContent:'center',
                        paddingRight:10,
                        paddingLeft:10,
                        borderLeftWidth:1,
                        borderColor:'#E3E8EF'
                    }}
                >
                    <Text style={{alignSelf:'center'}}>{selectedUnit}</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

InputUnitField.propTypes = {};
InputUnitField.defaultProps = {};

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
        flexDirection:'row',
        flex: 1,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
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

export default InputUnitField;
