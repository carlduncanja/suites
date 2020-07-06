import React, { useContext, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './Header';
import Data from './Data';
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const Divider = () =>{
    return( 
        <View
            style={{
                height:1,
                marginBottom:20,
                marginTop:10,
                backgroundColor:"#CCD6E0",
            }}
        />
    )
}
const Table = (props) => { 

    const {
        data,
        listItemFormat,
        headers,
        isCheckbox,
        toggleHeaderCheckbox = isCheckbox ? toggleHeaderCheckbox : ()=>{},
        itemSelected = isCheckbox ? itemSelected : [],
       
    } = props  

    // const toggleHeaderCheckbox = isCheckbox ? toggleHeaderCheckbox : ()=>{};
    // const itemSelected = isCheckbox ? itemSelected : [];
    
    const isIndeterminate = itemSelected.length > 0 && itemSelected.length !== data.length;
    return ( 
        <>
            <View style={styles.header}>
                {/* {headerItemFormat()} */}
                <Header 
                    headers = {headers}
                    toggleHeaderCheckbox = {toggleHeaderCheckbox}
                    isIndeterminate = {isIndeterminate}
                    checked = {itemSelected.length > 0}
                    isCheckbox = {isCheckbox}
                />
            </View>
            {Divider()}
            <View style={{paddingBottom:5}}>
                <Data
                    listItemFormat = {listItemFormat}
                    data = {data}
                    // currentListMin = {currentListMin}
                    // currentListMax = {currentListMax}
                    // dataLength = {dataLength}
                    // toggleCheckbox = {toggleCheckbox}
                />
            </View>
            {/* {Divider()} */}
        </>
    );
}
 
export default Table;
const styles = StyleSheet.create({
    header:{
        //marginBottom:25,
    },
    data:{}
})