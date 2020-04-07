import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import { withModal } from 'react-native-modalfy';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { appActions } from '../../../redux/reducers/suitesAppReducer'

/**
 * @param modalToOpen string
 * @param checkbox component
 * @param listItem object
 * @param toggleCheckBox function
 * @param listItemFormat object
 * @return {*}  
 * @constructor
 */
const ListItem = (props) => {

    const { modalToOpen, modal, checkbox, listItem, toggleCheckBox, listItemFormat} = props

    const [state,dispatch] = useContext(SuitesContext)


    const handleSelectedListItem = (listItem) => {
        let selectedObj = listItem
        dispatch({
            type: appActions.SETSELECTEDLISTITEM,
            newState:{
                selectedListItemId : listItem.id,
                selectedListObject : selectedObj
            }
        })
    }

    return (
        <TouchableOpacity onPress={()=>{handleSelectedListItem(listItem);modal.openModal(modalToOpen)}}>
            <View style={styles.container}>
                <TouchableOpacity style={{alignSelf:'center', justifyContent:'center', padding:10}} onPress={()=>toggleCheckBox(listItem)}>
                    {checkbox}
                </TouchableOpacity>
                {listItemFormat(listItem)}
            </View>
        </TouchableOpacity>
    );
}

export default withModal(ListItem);

const styles = StyleSheet.create({
    container:{
        // flex:1,
        flexDirection:'row',
        // flexWrap:'wrap',
        alignItems:'center',
        //justifyContent:'center',
        // padding:10,
        paddingBottom:8,
        paddingTop:8,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        borderWidth:1,
        borderColor: "#E3E8EF",
        width:'100%',
        marginBottom:10,
        // justifyContent:'center'
    },
})
