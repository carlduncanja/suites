import React, { Component, useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import InputText from './InputText';
import SvgIcon from '../../assets/SvgIcon'

const SearchBar = ({changeText, inputText, matchesFound, onPressNextResult, onPressPreviousResult, onPressNewSerch, onPressSubmit}) =>{
    return(
        <View style={styles.searchBar}>
            <View style={[styles.container, styles.searchContent]}>
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{paddingRight:15, alignSelf:'flex-start'}}>
                        <SvgIcon iconName="search" strokeColor="#A0AEC0"/>
                    </View>
                    <View style={{flex:1}}>
                        <InputText
                        changeText = {changeText}
                        inputText = {inputText}
                        placeholderTextColor = "#A0AEC0"
                        placeholder=""
                    />
                    </View>
                    
                </View>
                <View style={{flexDirection:'row', alignSelf:'flex-start'}}>
                    <Text style={{color:'#3182CE', fontSize:12, paddingRight:8}}>{matchesFound} matches found</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress = {() => onPressNewSerch()}
                    >
                        <SvgIcon iconName="searchExit" strokeColor="#718096"/>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={[styles.container,styles.control]}>
                <TouchableOpacity
                    activeOpacity = {1}
                    style={{padding:8, paddingLeft:6}}
                    onPress={() => onPressPreviousResult()}
                >
                    <SvgIcon iconName = "scheduleMonthLeft" strokeColor = "#718096"/>
                </TouchableOpacity>

                <View style={{borderWidth:1, borderColor:'#E3E8EF'}}/>

                <TouchableOpacity
                    activeOpacity = {1}
                    style={{padding:8, paddingRight:6}}
                    onPress = {() => onPressNextResult()}
                >
                    <SvgIcon iconName = "scheduleMonthRight" strokeColor = "#718096"/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                activeOpacity={1}
                style={[styles.container,{marginLeft:10, paddingLeft:12, paddingRight:12}]}
                onPress = {() => onPressSubmit()}
            >
                <Text style={{color:'#0CB0E7', fontSize:16}}>Done</Text>
            </TouchableOpacity>

        </View>
    )
}
export default SearchBar

const styles=StyleSheet.create({
    searchBar:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#FAFAFA',
        padding:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 8,
    },
    container:{
        flexDirection:'row',
        backgroundColor:"#F8FAFB",
        borderWidth:1,
        borderColor:'#E3E8EF',
        borderRadius:8,
        padding:8,
        paddingLeft:6,
        paddingRight:6,
    },
    searchContent:{
        flex:1,
        //alignItems:'center',
        //justifyContent:'space-between'
    },
    control:{
        backgroundColor:'#FFFFFF',
        marginLeft:10,
        padding:0,
    },
})
