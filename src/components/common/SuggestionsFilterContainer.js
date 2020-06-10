import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput, ScrollView} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import SearchInput,{ createFilter } from 'react-native-search-filter';

import ClearIcon from "../../../assets/svg/clearIcon";
import AddIcon from "../../../assets/svg/addIcon";

import IconButton from "./Buttons/IconButton";
import CheckBoxComponent from './Checkbox';
import { checkboxItemPress } from '../../helpers/caseFilesHelpers';
import Search from './Search';

/**
 * @param keysToFilter array of string 
 * @param options array of strings
 * @returns {*} 
 */

const SuggestionsFilterContainer = ({ options, searchText, onSearchChangeText, onOptionSelected}) => {

    const [selectedOption, setSelectedOption] = useState('All')

    return (
        <>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.inputField}
                    value = {searchText}
                    onChangeText = {(text)=>onSearchChangeText(text)}
                    keyboardType = {"default"}
                    placeholder = "Filter"
                />
            </View>
            
      
            <View style={styles.suggestionsContainer}>
                {options.map(( option, index)=>{
                   
                    return (
                        <View key={index} style={[styles.optionWrapper,{backgroundColor: selectedOption === option ? "#EEF2F6" : null}]}>
                            <Text style={{color:"#323843", fontSize:14}}>{option}</Text>
                        </View>
                    )
                })}
            </View>
        </>

    )
}

export default SuggestionsFilterContainer

const styles = StyleSheet.create({
    searchContainer:{
        height:30,
        borderBottomColor:"#E3E8EF",
        borderBottomWidth: 1,
        flexDirection:'row',
        // alignItems:'center'
    },
    inputField: {
        flex: 1,
        height: 32,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },
    suggestionsContainer:{
        // height:120,
    },
    optionWrapper : {
        flexDirection : 'row',
        padding:10
    },
})