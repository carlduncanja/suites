import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SvgIcon from "../../../../assets/SvgIcon";
import Button from "../../common/Buttons/Button";
import Table from "../../common/Table/Table"
import Paginator from '../../common/Paginators/Paginator';
import {useNextPaginator,usePreviousPaginator} from '../../../helpers/caseFilesHelpers';
import IconButton from "../../common/Buttons/IconButton";
import AddNew from '../../../../assets/svg/addNewIcon';
import {useModal} from "react-native-modalfy";


const ActionableListCard = (props) =>{  

    const {
        title,
        closeModal,
        data,
        selectedTab,
        listItemFormat,
        tabs,
        headers,
        onPressTab,
        onFooterPress = () => {},
        onActionPress
    } = props

    const recordsPerPage = 6
    const dataLength = data.length
    const totalPages = Math.ceil(dataLength/recordsPerPage)
    const modal = useModal();


    const [currentPagePosition, setCurrentPagePosition] = useState(1)
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)

    const goToNextPage = () => {
        if (currentPagePosition < totalPages){
            let {currentPage,currentListMin,currentListMax} = useNextPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition > 1){
            let {currentPage,currentListMin,currentListMax} = usePreviousPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax)
        }
    };

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text>{title}</Text>
                <TouchableOpacity onPress={()=>closeModal()} style={{alignItems:'flex-end'}}>
                    <SvgIcon iconName = "searchExit" strokeColor="#718096"/>
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                {
                    tabs.map((tab,index)=>{
                        return (
                            <View style={[styles.tab,{marginRight:10, backgroundColor: tab === selectedTab ? "#FFFFFF" : null}]} key={index}>
                                <Button
                                    backgroundColor = {tab === selectedTab ? "#FFFFFF" : null}
                                    color = {tab === selectedTab ? "#3182CE" : "#A0AEC0" }
                                    buttonPress = {()=>{onPressTab(tab)}}
                                    title = {tab}
                                />
                            </View>
                        )
                    }) 
                }
            </View>

            <TouchableOpacity 
                style={[styles.new]}
                onPress = {onActionPress}
            >
                <View style={{justifyContent:'center'}}>
                    <Text style={{color:'#4E5664', fontSize:16, paddingLeft:10}}>Add Item</Text>
                </View>
                
                <IconButton Icon = {<AddNew/>}/>

            </TouchableOpacity>

            

            <View style={styles.list}>
                <Table
                    data = {data}
                    listItemFormat = {listItemFormat}
                    headers = {headers}
                    isCheckbox = {false}
                />
            </View>

            {
                totalPages > 1 &&
                    <View style={{marginLeft:20, marginRight:20, justifyContent:'space-between', flexDirection:'row', alignItems:'center',marginBottom:15}}>
                        <View style={[{alignItems:'center'}]}>
                            <Text style={{color:'#4E5664', fontSize:16}}>Showing
                                <Text style={{fontWeight:'500'}}> {recordsPerPage}</Text> of <Text style={{fontWeight:'500'}}>{dataLength}</Text>
                            </Text>
                        </View>
                        <View style={styles.paginationContainer}>
                            <Paginator
                                currentPage = {currentPagePosition}
                                totalPages = {totalPages}
                                goToNextPage = {goToNextPage}
                                goToPreviousPage = {goToPreviousPage}
                            />
                        </View>

                    </View>
            }


            <View style={styles.footer}>
                <Button
                    backgroundColor = "#FFFFFF"
                    title = {"DONE"}
                    buttonPress = {onFooterPress}
                    color = "#4299E1"
                    fontSize = {16}
                    fontWeight = 'bold'
                />
            </View>


        </View>
    )
}

export default ActionableListCard

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        width:600,
        height: 200,
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderBottomColor:'#CCD6E0',
        borderBottomWidth:1
    },
    headerTitle:{
        fontSize:16,
        color:"#323843"
    },
    tabContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#EEF2F6',
        paddingTop:15,
        paddingBottom:15,
        height: 50,
    },
    tab:{
        borderRadius: 4,
        padding:10,
        paddingBottom:6,
        paddingTop:6
    },
    addNew:{
        flexDirection:'row',
        height:40,
        margin:15,
        padding:10,
        borderColor:'#CCD6E0',
        borderRadius:4,
        borderWidth:1,
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:'red'
    },
    new:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:'#CCD6E0',
        borderRadius:4,
        borderWidth:1,
        margin:15
    },
    list:{
        margin:15,
        borderColor:"#CCD6E0",
        borderWidth:1,
        borderRadius:8,
        padding:10
    },
    listDataContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    dataText:{
        fontSize:16
    },
    headerText:{
        fontSize:12,
        color:"#718096",
        fontWeight:'500'
    },
    buttonStyle:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:'#F8FAFB',
        borderRadius: 4,
        // padding:4,
        paddingLeft:25,
        paddingRight:25,
        marginBottom:20,
        alignItems:"center",
        justifyContent:'center',
    },
    paginationContainer:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:'#FFFFFF',
        borderRadius: 4,
        padding:8,
        // alignSelf:'flex-end',
        marginRight:15,
        // marginBottom:20,
    },
    footer:{
        // backgroundColor:'#FFFFFF',
        // backgroundColor:'red',
        borderTopWidth:1,
        borderTopColor:'#CCD6E0',
        // borderBottomLeftRadius:4,
        padding:5,
        paddingBottom:20,
        paddingTop:20,
        marginTop:8
    }
})
