import React, {Component, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withModal } from 'react-native-modalfy';
import { SuitesContext } from '../../../contexts/SuitesContext';
import Item from './Table/Item'

openModal = (props) => {
    const { modalToOpen, modal } = props
    modal.openModal(modalToOpen)
}

const ListItem = (props) => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethods = useContext(SuitesContext).methods

    return ( 
        <TouchableOpacity onPress={()=>{suitesMethods.handleSelectedListItem(props.fields.recordId);this.openModal(props)}}>
            <View style={styles.container}>
                <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}} onPress={()=>suitesMethods.toggleCheckbox(props.fields.recordId)}>
                    {props.checkbox}
                </TouchableOpacity>
                <Item fields = {props.fields}/>
            </View>
        </TouchableOpacity>
    );
}
 
export default withModal(ListItem);

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:10,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        borderWidth:1,
        borderColor: "#E3E8EF",
        width:'100%',
        marginBottom:10
    },
    item:{
        flex:1,
        // width:'25%',
        alignItems:"flex-start",
        justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        color:"#4E5664",
    }
})