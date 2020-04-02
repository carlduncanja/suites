import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Table from '../../../common/Table/Table';
import SvgIcon from '../../../../../assets/SvgIcon'
import Checkbox from '../../../common/Checkbox/Checkbox';

const headers = ["Invoice Number", "Status", "Date", "Value", "Actions"]
const itemWidth =  `${100/headers.length}%`

const Invoices = ({tabDetails}) => {
    const listItem = (item) => {
        return (
            <View style={styles.container}>
                <View style={{marginRight:20}}>
                    <Checkbox/>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.item}>
                        <Text style={[styles.itemText]}>{item.invoiceNumber}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-start'}]}>
                        <Text style={[styles.itemText,{color: item.status === 'Complete' ? "#319795" : "#DD6B20"}]}>{item.status}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-start'}]}>
                        <Text style={styles.itemText}>{item.date}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'center'}]}>
                        <Text style={styles.itemText}>{item.value}</Text>
                    </View>
                    <View style={[styles.item,{alignItems:'flex-end', marginRight:20}]}>
                        <TouchableOpacity
                            style={{}}
                            onPress={()=>{
                                // this.openModal(props);
                                // openReportAction(props.fields.recordId)
                            }}>
                            <SvgIcon iconName = "actions"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const headerItem = () => {
        return (
            <View style={styles.headersContainer}>
                <View style={{marginRight:20}}>
                    <Checkbox/>
                </View>
            
                <View style={styles.headerItem}>
                    <Text style={styles.headerText}>Invoice Number</Text>
                </View>
                <View style={[styles.headerItem,{alignItems:'flex-start'}]}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
                <View style={[styles.headerItem,{alignItems:'flex-start'}]}>
                    <Text style={styles.headerText}>Date</Text>
                </View>
                <View style={[styles.headerItem,{alignItems:'center'}]}>
                    <Text style={styles.headerText}>Value</Text>
                </View>
                <View style={[styles.headerItem,{alignItems:'flex-end'}]}>
                    <Text style={styles.headerText}>Actions</Text>
                </View>
            </View>
        )}
    // const [state, dispatch] = useContext(SuitesContext)
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
    //     const headers = ["Invoice Number", "Status", "Date", "Value", "Actions"]
    //     const list = getReportList(state.slideOverlay.slideOverlayTabInfo, headers)
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
 
export default Invoices;

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