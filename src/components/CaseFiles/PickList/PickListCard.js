import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SvgIcon from "../../../../assets/SvgIcon";
import Button from "../../common/Buttons/Button";
import Table from "../../common/Table/Table"
import Paginator from '../../common/Paginators/Paginator';
import {useNextPaginator,usePreviousPaginator} from '../../../helpers/caseFilesHelpers';

const PickListCard = ({title, isEditMode = false, onEditDone = ()=>{},closeModal, data, selectedTab, listItemFormat, tabs, headers, isCheckBox ,onPressTab}) =>{

    const recordsPerPage = 6
    const dataLength = data.length
    const totalPages = Math.ceil(dataLength/recordsPerPage)

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

            <View style={styles.list}>
                <Table
                    data = {data}
                    currentListMin = {currentPageListMin}
                    currentListMax = {currentPageListMax}
                    listItemFormat = {listItemFormat}
                    headers = {headers}
                    isCheckbox = {isCheckBox}
                />
            </View>

            {
                isEditMode ?
                    <View style={{marginLeft:20, marginRight:20, justifyContent:'space-between', flexDirection:'row'}}>
                        <View style={[styles.paginationContainer,{alignSelf:'flex-start'}]}>
                            <Paginator
                                currentPage = {currentPagePosition}
                                totalPages = {totalPages}
                                goToNextPage = {goToNextPage}
                                goToPreviousPage = {goToPreviousPage}
                            />
                        </View>
                        <View style={styles.buttonStyle}>
                            <Button
                                backgroundColor = "#F8FAFB"
                                title = 'DONE'
                                buttonPress = {onEditDone}
                                color = "#4299E1"
                            />
                        </View>

                    </View>
                    :
                    <View style={{alignItems:'flex-end', justifyContent:'flex-end'}}>
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
        
        </View>
    )
}

export default PickListCard

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        width:400,
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
        paddingBottom:15
    },
    tab:{
        borderRadius: 4,
        padding:10,
        paddingBottom:6,
        paddingTop:6
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
        alignSelf:'flex-end',
        marginRight:15,
        marginBottom:20
    }
})
