import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import ListItem from './ListItem';
import { CheckedBox } from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';

 
/**
 * @param listData arrray of objects
 * @param currentPageListMin number
 * @param currentPageListMax number
 * @param toggleCheckBox function
 * @param checkBoxList array of objects
 * @param listItemFormat object
 * @return {*} 
 * @constructor 
 */

const ListData = ({listData, currentPageListMin, currentPageListMax, toggleCheckBox, checkBoxList, listItemFormat}) => {
   
    return ( 
        <ScrollView 
            bounces={false}
            contentContainerStyle={{paddingBottom:300}}
            >
            {listData.slice(currentPageListMin, currentPageListMax).map((item,index)=>{
               return(
                    <View key={index}>
                        <ListItem
                            // OverlaySlidePanelModal
                            modalToOpen = "BottomSheetModal"
                            listItem={item}
                            checkbox = {checkBoxList.includes(item) ? <CheckedBox/> : <Checkbox/>}
                            toggleCheckBox = {toggleCheckBox}
                            listItemFormat = {listItemFormat}
                        />
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default ListData;