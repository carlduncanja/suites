import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import Table from '../../../common/Table/Table';
import Checkbox from '../../../common/Checkbox/Checkbox';
import { CheckedBox, PartialCheckbox} from '../../../common/Checkbox/Checkboxes';
import { useCheckBox } from '../../../../hooks/useCheckBox'

const headers = ["Item Name", "Type", "Quantity", "Unit Price"]
const itemWidth = `${100/headers.length}%`

const Consumables = ({tabDetails}) => {
    const [state, dispatch] = useContext(SuitesContext)
    const [checkBoxList, setCheckBoxList] = useState([])
    
    const listItem = (item, id) => {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={{marginRight:20}} onPress={()=>toggleCheckbox(id)}>
                    { checkBoxList.includes(id) ? <CheckedBox/> : <Checkbox/> }
                </TouchableOpacity>
                <View style={styles.dataContainer}>
                    <View style={styles.item}>
                        <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.itemName}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-start'}]}>
                        <Text style={styles.itemText}>{item.type}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'center'}]}>
                        <Text style={styles.itemText}>{item.quantity}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-end'}]}>
                        <Text style={styles.itemText}>{item.unitPrice}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const headerItem = () => {
        return(
            <View style={styles.headersContainer}>
                <View style={{marginRight:20}}>
                    {checkBoxList.length > 0 ? <PartialCheckbox/> : <Checkbox/>}
                </View>
            
                <View style={styles.headerItem}>
                    <Text style={styles.headerText}>Item Name</Text>
                </View>
                <View style={[styles.headerItem,{alignItems:'center'}]}>
                    <Text style={styles.headerText}>Type</Text>
                </View>
                <View style={[styles.headerItem,{alignItems:'center'}]}>
                    <Text style={styles.headerText}>Quantity</Text>
                </View>
                <View style={[styles.headerItem,{alignItems:'flex-end'}]}>
                    <Text style={styles.headerText}>Unit Price</Text>
                </View>
        </View>
        )
        
    }
   
    const toggleCheckbox = (itemId) =>{
        let checkedList = useCheckBox(itemId,checkBoxList)
        setCheckBoxList(checkedList)
    }

    // const setListTabData = (list,headers) => {
    //     dispatch({
    //         type: appActions.SETSLIDEOVERLAYLIST,
    //         newState : {
    //             slideOverlayList : list,
    //             slideOverlayListHeaders : headers
    //         }
    //     })
    //     return true
    // }
    
    // useEffect(()=>{
    //     const headers = ["Item Name", "Type", "Quantity", "Unit Price"]
    //     const list = getList(state.slideOverlay.slideOverlayTabInfo, headers)
    //     setListTabData(list,headers)
    // })
    
    
   
    return ( 
        <ScrollView>
            <Table
                data = {tabDetails}
                listItemFormat = {listItem}
                headerItemFormat = {headerItem}
                // toggleCheckbox = {toggleCheckbox}
            />
        </ScrollView>
    );
}
 
export default Consumables;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        //alignItems:'flex-start',
        //justifyContent:'center',
        padding:10,
        backgroundColor:'#FFFFFF',
        width:'100%',
        marginBottom:10
    },
    dataContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:"flex-start",
        justifyContent:"space-between"
    },
    item:{
        width:itemWidth,
        // alignItems:"flex-start",
        // justifyContent:'center',
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
    headersContainer:{
        //flex:1,
        marginLeft:10,
        flexDirection:'row',
        //width:'100%'
    },
    headerItem:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerText:{
        fontSize:12,
        color:'#718096'
    }
})
