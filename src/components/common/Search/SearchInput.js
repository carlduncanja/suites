import React, {Component, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import InputText from '../InputText';
import SvgIcon from '../../../../assets/SvgIcon';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SearchBox from './SearchBox';
import SearchControls from './SearchControls';
import SearchComplete from './SearchComplete';

/**
 *
 * @param changeText
 * @param inputText
 * @param matchesFound
 * @param onPressNextResult
 * @param onPressPreviousResult
 * @param onPressNewSerch
 * @param onPressSubmit
 * @returns {*}
 * @constructor
 */

function SearchInput({changeText, inputText, matchesFound, onPressNextResult, onPressPreviousResult, onPressNewSerch, onPressSubmit}){
    const theme = useTheme();

    const SearchInputWrapper = styled.View`
        magin:0; 
        height: 60px;
        padding:${theme.space['--space-14']};
        background-color: #FAFAFA;
    `;
    const SearchInputContainer = styled.View`
        height: 100%;
        width: 100%;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
    ` 
    return (
        <SearchInputWrapper>
            <SearchInputContainer>

            <SearchBox
                onChangeText = {changeText}
                inputText = {inputText}
                matchesFound = {matchesFound}
                onPressNewSerch = {onPressNewSerch}
            />
            <SearchControls
                onPressNextResult = {onPressNextResult}
                onPressPreviousResult = {onPressPreviousResult}
            />

            <SearchComplete
                onSubmit = {onPressSubmit}
            />

            {/* <View style={[styles.container, styles.searchContent]}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{paddingRight: 15, alignSelf: 'flex-start'}}>
                        <SvgIcon iconName="search" strokeColor="#A0AEC0"/>
                    </View>
                    <View style={{flex: 1, position:'relative'}}>
                        <InputText
                            onChangeText={changeText}
                            inputText={inputText}
                            placeholderTextColor="#A0AEC0"
                            placeholder=""
                        />
                    </View>

                </View>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                    <Text style={{color: '#3182CE', fontSize: 12, paddingRight: 8}}>{matchesFound} matches found</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => onPressNewSerch()}
                    >
                        <SvgIcon iconName="searchExit" strokeColor="#718096"/>
                    </TouchableOpacity>

                </View>
            </View> */}

            {/* <View style={[styles.container, styles.control]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{padding: 8, paddingLeft: 6}}
                    onPress={() => onPressPreviousResult()}
                >
                    <SvgIcon iconName="scheduleMonthLeft" strokeColor="#718096"/>
                </TouchableOpacity>

                <View style={{borderWidth: 1, borderColor: '#E3E8EF'}}/>

                <TouchableOpacity
                    activeOpacity={1}
                    style={{padding: 8, paddingRight: 6}}
                    onPress={() => onPressNextResult()}
                >
                    <SvgIcon iconName="scheduleMonthRight" strokeColor="#718096"/>
                </TouchableOpacity>
            </View> */}

           
            </SearchInputContainer>
        </SearchInputWrapper>
    )
}
export default SearchInput

const styles = StyleSheet.create({
    searchBar: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFA',
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 8,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: "#F8FAFB",
        borderWidth: 1,
        borderColor: '#E3E8EF',
        borderRadius: 8,
        padding: 8,
        paddingLeft: 6,
        paddingRight: 6,
    },
    searchContent: {
        flex: 1,
        //alignItems:'center',
        //justifyContent:'space-between'
    },
    control: {
        backgroundColor: '#FFFFFF',
        marginLeft: 10,
        padding: 0,
    },
})
