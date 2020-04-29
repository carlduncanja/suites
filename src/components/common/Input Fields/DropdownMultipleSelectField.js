import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity} from "react-native";
import DropdownIcon from '../../../../assets/svg/dropdownIcon';
import RemoveIcon from '../../../../assets/svg/removeIcon';
import IconButton from '../Buttons/IconButton'
import InputField2 from '../Input Fields/InputField2';



function DropdownMultipleSelectField({label, onSelectChange, value, dropdownOptions}) {

    const [selectedOption, setSelectedOption] = useState([value])
    const [isOptionsDisplay, setDisplayOptions] = useState(false)

    const toggleDisplayOptions = () =>{
        setDisplayOptions(!isOptionsDisplay)
    }

    const setValue = (value) =>{
        setSelectedOption([...selectedOption,value])
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
                    <View style={styles.valueBox}>
                        <Text style={{padding:3,paddingLeft:5, marginRight:5}}>{selectedOption[0]}</Text>
                        <IconButton
                            Icon = {<RemoveIcon/>}
                            onPress = {()=>{}}
                        />
                    </View>
                    {
                        selectedOption.length - 1 > 0 &&
                            <Text style={{color:'#3182CE', fontSize:14}}>+ {selectedOption.length - 1} more</Text>
                    }
                    <IconButton
                        Icon = {<DropdownIcon/>}
                        onPress = {()=>toggleDisplayOptions()}
                    />
                </View>
            </View>
            {
                isOptionsDisplay &&

                    <ScrollView style={styles.optionsContainer}>
                        <View style = {styles.searchContainer}>
                            
                        </View>
                        <View>
                            {dropdownOptions.map(( option, index)=>{
                                return (
                                    <TouchableOpacity 
                                        key = {index} 
                                        style={{padding:4,}}
                                        onPress = {()=>{
                                            setValue(option),
                                            onSelectChange(option)
                                        }}
                                    >
                                        <Text>{option}</Text>
                                    </TouchableOpacity>
                                ) 
                            })}
                        </View>
                            
                    </ScrollView>
                        
                }
        </View>
    );
}

DropdownMultipleSelectField.propTypes = {};
DropdownMultipleSelectField.defaultProps = {};

export default DropdownMultipleSelectField;

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
        top:40,
        // bottom:0,
        left:0,
        right:0,
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 4, 
        backgroundColor:'#FFFFFF',
    },
    valueBox:{
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center',
        paddingRight:3,
        // padding:3,
        // paddingLeft:5,
        // paddingRight:5,
        borderColor:'#FEB2B2',
        borderWidth:1,
        backgroundColor:'#FFF5F5',
        borderRadius:2
    },
    searchContainer:{

    },
    inputField: {
        flex: 1,
        padding: 12,
        paddingTop: 9,
        paddingBottom: 9
    }
});


