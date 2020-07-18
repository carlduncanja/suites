import React,{} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../Table/Header';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
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

function ListHeader({listHeaders = [], toggleHeaderCheckbox=()=>{}, isIndeterminate = false, checked=false, isCheckbox=true}){

    const theme = useTheme()

    const ListHeaderWrapper = styled.View`
        margin-bottom: ${theme.space['--space-32']};
    `
    return (
        <ListHeaderWrapper>
            <Header
                headers={listHeaders}
                checked={checked}
                isCheckbox={isCheckbox}
                toggleHeaderCheckbox = {toggleHeaderCheckbox}
                isIndeterminate = {isIndeterminate}
            />
        </ListHeaderWrapper> 
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
