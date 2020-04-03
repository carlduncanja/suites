import React,{ useContext} from 'react';
import {View, ScrollView} from 'react-native';
import ListItem from './ListItem';
import { CheckedBox } from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import { SuitesContext } from '../../../contexts/SuitesContext';

const ListData = ({listData, routeName, currentPageListMin, currentPageListMax, toggleCheckBox, checkBoxList}) => {
    const [state] = useContext(SuitesContext) 
    return ( 
        <ScrollView 
            bounces={false}
            contentContainerStyle={{paddingBottom:300}}
            >
            {listData.slice(currentPageListMin, currentPageListMax).map((item,index)=>{
               return(
                    <View key={index}>
                        <ListItem
                            routeName = {routeName}
                            modalToOpen = "OverlaySlidePanelModal"
                            listItem={item}
                            checkbox = {checkBoxList.includes(item.id) ? <CheckedBox/> : <Checkbox/>}
                            toggleCheckBox = {toggleCheckBox}
                        />
                    </View>
                )
            })}
        </ScrollView>
    );
}
 
export default ListData;