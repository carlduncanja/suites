import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import SearchInput, { createFilter } from 'react-native-search-filter';

import ClearIcon from "../../../assets/svg/clearIcon";
import AddIcon from "../../../assets/svg/addIcon";

import IconButton from "./Buttons/IconButton";
import CheckBoxComponent from './Checkbox';
import { checkboxItemPress } from '../../helpers/caseFilesHelpers';

/**
 * @param keysToFilter array of string 
 * @returns {*} 
 */

const SearchableContainer = ({ options, onCheckboxPress, checkedList, searchText, onSearchChangeText, onClear }) => {

    return (
        <>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.inputField}
                    value={searchText}
                    onChangeText={(text) => onSearchChangeText(text)}
                    keyboardType={"default"}
                />
                <View style={{ alignItems: 'center', paddingLeft: 5, paddingRight: 5 }}>
                    <IconButton
                        Icon={<ClearIcon />}
                        onPress={() => { onClear() }}
                    />
                </View>

            </View>


            <ScrollView
                bounces={false}
                contentContainerStyle={{ flexDirection: "column", paddingBottom: 50, paddingTop: 10 }}

            >
                {options.map((option, index) => {
                    return (
                        <View key={index} style={styles.optionWrapper}>
                            <CheckBoxComponent
                                isCheck={checkedList.includes(option)}
                                onPress={onCheckboxPress(option)}
                                paddingLeft={'0px'}
                                paddingRight={'8px'}
                                paddingTop={'2px'}
                            />
                            <Text style={{ color: "#323843", fontSize: 14, paddingLeft: 0, marginBottom: 15 }}>{option}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </>

    )
}

export default SearchableContainer

const styles = StyleSheet.create({
    searchContainer: {
        height: 30,
        borderBottomColor: "#E3E8EF",
        borderBottomWidth: 1,
        flexDirection: 'row',
        // alignItems:'center'
    },
    inputField: {
        flex: 1,
        height: 32,
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },
    suggestionsContainer: {

    },
    optionWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        position: 'absolute',
        bottom: 2,
        left: 0,
        right: 0,
        // alignSelf:'flex-end',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: '#F8FAFB'
    }
})