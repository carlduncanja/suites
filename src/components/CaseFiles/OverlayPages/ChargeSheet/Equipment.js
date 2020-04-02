import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import Table from '../../../common/Table/Table';
import Checkbox from '../../../common/Checkbox/Checkbox';

const headers = ["Item Name", "Type", "Quantity", "Unit Price"];
const itemWidth = `${100/headers.length}%`

const Equipment = ({tabDetails}) => {
    const [state, dispatch] = useContext(SuitesContext)

    const listItem = (item) => {
        return(
            <View style={styles.container}>
                <View style={{marginRight:20}}>
                    <Checkbox/>
                </View>
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
                    <Checkbox/>
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

    const toggleCheckbox = () =>{}

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
    // },[state.slideOverlay.slideOverlayTabInfo])
    
   
    return ( 
        <ScrollView>
            <Table
                data = {tabDetails}
                listItemFormat = {listItem}
                headerItemFormat = {headerItem}
            />
        </ScrollView>
    );
}
 
export default Equipment;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
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
