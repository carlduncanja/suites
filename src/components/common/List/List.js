import React, { useContext, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import ListHeader from './ListHeader';
import ListData from './ListData';
import { SuitesContext } from '../../../contexts/SuitesContext';
import {useCheckBox} from '../../../hooks/useCheckBox';
 
const List = ({listData, listHeaders, routeName, currentPageListMin, currentPageListMax}) => { 
    const [state] = useContext(SuitesContext)

    const [checkBoxList, setCheckBoxList] = useState([])

    const toggleCheckBox = (itemId) =>{
        let checkedItemsList = useCheckBox(itemId,checkBoxList)
        setCheckBoxList(checkedItemsList)
    }

    return (  
        <View>
            <View style={styles.header}>
                <ListHeader 
                    listHeaders={listHeaders}
                    checkedItemList = {checkBoxList}
                /> 
            </View>
            <View style={styles.data}>
                <ListData 
                    listData = {listData} 
                    routeName = {routeName}
                    currentPageListMin = {currentPageListMin}
                    currentPageListMax = {currentPageListMax}
                    toggleCheckBox = {toggleCheckBox}
                    checkBoxList = {checkBoxList}
                />
            </View>
        </View>
    );
}
 
export default List;
const styles = StyleSheet.create({
    header:{
        marginBottom:25,
    },
    data:{}
})