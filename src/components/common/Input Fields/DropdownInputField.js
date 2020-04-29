import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity} from "react-native";
import DropdownIcon from '../../../../assets/svg/dropdownIcon';
import IconButton from '../Buttons/IconButton'


function DropdownInputField({label, onSelectChange, value, dropdownOptions}) {

    const [selectedOption, setSelectedOption] = useState(value)
    const [isOptionsDisplay, setDisplayOptions] = useState(false)

    const toggleDisplayOptions = () =>{
        setDisplayOptions(!isOptionsDisplay)
    }

    const setValue = (value) =>{
        setSelectedOption(value)
        setDisplayOptions(false)
    }
    
    return (
        <View style={styles.container}>
            <Text style={[
                styles.textLabel, {
                    marginRight: label ? 20 : 0
                }
            ]}>{label}</Text>

            <View style={[styles.inputWrapper]}>
                <View style={{flex:1,justifyContent:'space-between', paddingLeft:4, flexDirection:'row', alignItems:'center',paddingRight:4}}>
                    <Text>{selectedOption}</Text>
                    <IconButton
                        Icon = {<DropdownIcon/>}
                        onPress = {()=>toggleDisplayOptions()}
                    />
                </View>
            </View>

            {
                isOptionsDisplay &&
                    // <View style={styles.optionsContainer}>
                        <ScrollView style={styles.optionsContainer}>
                            {dropdownOptions.map(( option, index)=>{
                                return (
                                    <TouchableOpacity 
                                        key = {index} 
                                        style={{padding:4, paddingLeft:8}}
                                        onPress = {()=>{
                                            setValue(option),
                                            onSelectChange(option)
                                        }}
                                    >
                                        <Text>{option}</Text>
                                    </TouchableOpacity>
                                ) 
                            })}
                        </ScrollView>
                    // </View>
            }

        </View>
    );
}

DropdownInputField.propTypes = {};
DropdownInputField.defaultProps = {};

export default DropdownInputField;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
    },
    optionsContainer:{
        flex:1,
        height:100, 
        position:'absolute', 
        width:'100%', 
        top:35,
        // bottom:0,
        left:0,
        right:0,
        borderWidth: 1,
        borderColor: '#CCD6E0',
        borderRadius: 8, 
        backgroundColor:'#FFFFFF',
    },
    inputField: {
        flex: 1,
        padding: 12,
        paddingTop: 9,
        paddingBottom: 9
    }
});


