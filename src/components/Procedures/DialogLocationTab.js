import React,{ useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AddIcon from '../../../assets/svg/addNewIcon';
import Table from '../common/Table/Table';
import Paginator from "../common/Paginators/Paginator";
import Button from '../common/Buttons/Button';
import IconButton from '../common/Buttons/IconButton'
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";

import { useNextPaginator,usePreviousPaginator } from '../../helpers/caseFilesHelpers';

const testLocations = [
    {
        location : 'Operating Room 1',
        status: 'In Use',
        hasRecovery : false,
        availability : 3
    },
    {
        location : 'Operating Room 2',
        status: 'Available',
        hasRecovery : false,
        availability : 3
    },
    {
        location : 'Operating Room 3',
        status: 'In Use',
        hasRecovery : true,
        availability : 3
    },
    {
        location : 'Operating Room 4',
        status: 'In Use',
        hasRecovery : false,
        availability : 3
    },
    {
        location : 'Operating Room 5',
        status: 'In Use',
        hasRecovery : true,
        availability : 3
    },
]

const DialogLocationTab = ({theatres , onFieldChange}) =>{

    const recordsPerPage = 4

    const [currentPagePosition, setCurrentPagePosition] = useState(1)
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [displayLocations, setDisplayLoations] = useState(false)
    const [selectedLocations, setSelectedLocations] = useState([])

    const totalPages = Math.ceil(selectedLocations.length/recordsPerPage)

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


    const headers = [
        {
            name : "Location",
            alignment : "flex-start"
        },
        {
            name : "Status",
            alignment : "center"
        },
        {
            name : "Recovery",
            alignment : "center"
        },
        {
            name : "Availbility",
            alignment : "flex-end"
        }
    ]

    const addLocation = () =>{
        setDisplayLoations(true)
    }

    const onPressItem = (item) =>{
        setSelectedLocations([...selectedLocations, item])
    }

    const listItem = (item) => {
        const status = "In Use"
        const availability = 3
        let recovery = item.hasRecovery ? "Yes" : "No"
        const statusColor = status === 'In Use' ? '#DD6B20' : item.status === 'Available' ? "#38A169" : "#323843"
        const recoveryColor = item.hasRecovery ? "#38A169" : '#DD6B20'

        return (
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>onPressItem(item)}>
                <View style={styles.itemContainer}>
                    <Text style={{color:'#3182CE', fontSize:16}}>{item.name}</Text>
                </View>
                <View style={[styles.itemContainer,{alignItems:'center'}]}>
                    <Text style={{color: statusColor, fontSize:14}}>{status}</Text>
                </View>
                <View style={[styles.itemContainer,{alignItems:'center'}]}>
                    <Text style={{color:recoveryColor, fontSize:14}}>{recovery}</Text>
                </View>
                <View style={[styles.itemContainer,{alignItems:'flex-end'}]}>
                    <Text style={{color:'#323843', fontSize:14}}>{availability} Slots</Text>
                </View>
            </TouchableOpacity>
        )
    }

    let dataToDisplay = [...selectedLocations]
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <View style={styles.sectionContainer}>

            <Menu 
                onClose = {()=>{}}
                // onSelect={oneOptionsSelected} 
                // style={{flex: 1,position:"relative"}} 
                // style={[styles.container,styles.addNewContainer]}
            >
                <MenuTrigger>
                    <View style={[styles.container,styles.addNewContainer]}>
                        <Text>Add New Location</Text>
                        <AddIcon/>
                    </View>
                </MenuTrigger>
                <MenuOptions customStyles = {optionsStyles}>
                    <ScrollView style={{ height:200, width:"100%", backgroundColor:'#FFFFFF',padding: 10, borderColor:'#CCD6E0', borderWidth:1}}>
                        <Table
                            isCheckbox = {false}
                            data = {theatres}
                            listItemFormat = {listItem}
                            headers = {[]}
                        />
                    </ScrollView>
                </MenuOptions>
            </Menu>
            
            <View style={[styles.container,styles.listContainer]}>
                <Table
                    isCheckbox = {false}
                    data = {dataToDisplay}
                    listItemFormat = {listItem}
                    headers = {headers}
                />
                <View style={styles.footer}>
                    <View style={styles.paginatorContainer}>
                        <Paginator
                            totalPages = {totalPages}
                            goToNextPage = {goToNextPage}
                            goToPreviousPage = {goToPreviousPage}
                            currentPage = {currentPagePosition}
                        />
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <Button
                            backgroundColor = "#F8FAFB"
                            // buttonPress = {()=>{console.log("Selected: ", selectedLocations)}}
                            buttonPress = {()=>onFieldChange('supportedRooms')(selectedLocations.map( item => item._id))}
                            title = "DONE"
                            color = "#4299E1"
                        />
                    </View>
                    
                </View>
            </View>

        </View>
    )
}

DialogLocationTab.propTypes = {}
DialogLocationTab.defaultProps = {}

export default DialogLocationTab

const optionsStyles = {
    optionsContainer: {
        width: 600,
        backgroundColor:"rgba(255, 255, 255, 0)"
    }
}

const styles = StyleSheet.create({
    sectionContainer: {
        height: 350,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    container:{
        backgroundColor:'#FFFFFF',
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        padding:10,
        paddingTop:6,
        paddingBottom:6,
    },
    addNewContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    listContainer:{
        paddingTop:10,
        paddingBottom:10
    },
    footer:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    paginatorContainer:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#FFFFFF',
        padding:4,
    },
    buttonContainer:{
        padding:30, 
        paddingBottom:5, 
        paddingTop:5,
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#F8FAFB',
        alignItems:'center',
        justifyContent:'center'
    },
    itemContainer:{
        flex:1,
        borderBottomColor:'#E3E8EF',
        borderBottomWidth:1,
        marginBottom:8,
        paddingBottom:10
    }
})