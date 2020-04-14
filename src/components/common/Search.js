import React from 'react';
import {View, StyleSheet} from 'react-native';
import InputText from './InputText';

const Search = ({placeholderText, changeText, inputText}) =>{
    return (
        <View style={styles.container}>
            <InputText
                onChangeText={changeText}
                placeholder={placeholderText}
                placeholderTextColor = {"#A0AEC0"}
                value = {inputText}
            />
        </View>
    )
};

export default Search

const styles = StyleSheet.create({
    container:{
        borderRadius:8,
        borderWidth:1,
        borderColor:'#CCD6E0',
        backgroundColor:'#FFFFFF',
        padding:10,
    }
});
