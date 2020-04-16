import React,{} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../Table/Header';

/**
 * @param checkedItemList array of objects
 * @param listHeaders array of objects
 * @param toggleHeaderCheckbox function
 * @param numbers
 * @return {*}
 * @constructor
 */

 //Pass length instead of entire list/ boolean
 //ToggleCheckbox - select page items

const ListHeader = ({listHeaders, toggleHeaderCheckbox, isIndeterminate, checked}) => {

    return (
        <View style = {styles.container}>
           <Header
                headers={listHeaders}
                checked={checked}
                toggleHeaderCheckbox = {toggleHeaderCheckbox}
                isIndeterminate = {isIndeterminate}
            />
        </View>
    );
};

export default ListHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'flex-start',
        padding:10,
        paddingLeft: 0,
        paddingRight: 0
    },

});
