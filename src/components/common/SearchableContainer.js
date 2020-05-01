import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TextInput, ScrollView} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import SearchInput,{ createFilter } from 'react-native-search-filter';

import RemoveIcon from "../../../assets/svg/removeIcon";
import AddIcon from "../../../assets/svg/addIcon";

import IconButton from "./Buttons/IconButton";
import CheckBoxComponent from './Checkbox';
import { checkboxItemPress } from '../../helpers/caseFilesHelpers';

/**
 * @param keysToFilter array of string 
 * @returns {*} 
 */

const SearchableContainer = ({keysToFilter, options, handleIsCheck  ,onCheckboxPress, checkedList, searchText, onSearchChangeText}) => {

    const  KEYS_TO_FILTER = keysToFilter

    const filteredOptions = searchText === '' ? [] : options.filter(createFilter(searchText, KEYS_TO_FILTER))
    return (
        <>
            <View style={styles.searchContainer}>
                <TextInput
                    value = {searchText}
                    onChangeText = {(text)=>onSearchChangeText(text)}
                    keyboardType = {"default"}
                />
            </View>
             <ScrollView 
                bounces = {false}
                style={styles.suggestionsContainer}
            >
                {filteredOptions.map(( option, index)=>{
                   
                    return (
                        <View key={index} style={styles.optionWrapper}>
                            <CheckBoxComponent
                                isCheck = {checkedList.includes(option)}
                                onPress = {onCheckboxPress(option)}
                            />
                            <Text style={{color:"#323843", fontSize:14, paddingLeft:6}}>{option.name}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </>

    )
}

export default SearchableContainer

const styles = StyleSheet.create({
    searchContainer:{
        padding:10,
        paddingLeft:6,
        paddingRight:6,
        borderBottomColor:"#E3E8EF",
        borderBottomWidth: 1
    },
    suggestionsContainer:{
        // height:120,
    },
    optionWrapper : {
        flexDirection : 'row',
        padding:10
    },
    footer:{
        flex:1,
        position:'absolute',
        bottom:2,
        left:0,
        right:0,
        // alignSelf:'flex-end',
        flexDirection:'row',
        justifyContent:"space-between",
        padding:10,
        backgroundColor:'#F8FAFB'
    }
})