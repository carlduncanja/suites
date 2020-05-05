import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AddIcon from '../../../assets/svg/addNewIcon';
import Table from '../common/Table/Table';
import Paginator from "../common/Paginators/Paginator";
import Button from '../common/Buttons/Button';
import Item from '../common/Table/Item';
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";

import IconButton from '../common/Buttons/IconButton'
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import { getTheatres } from "../../api/network";
import _ from "lodash";

import { useNextPaginator,usePreviousPaginator } from '../../helpers/caseFilesHelpers';
import SearchableMultipleOptionField from "../common/Input Fields/SearchableMultipleOptionField";

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

const DialogLocationTab = ({onFieldChange, fields, getSavedTheatres, savedTheatres}) =>{

    const recordsPerPage = 4

    const [currentPagePosition, setCurrentPagePosition] = useState(1)
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
   
    const [searchLocationValue, setSearchLocationValue] = useState("")
    const [searchLocationResults, setSearchLocationResults] = useState([])
    const [searchLocationQuery, setSearchLocationQuery] = useState({});

    const [selectedLocations, setSelectedLocations] = useState([])
    const [isDisable, setIsDisable] = useState(false)


    const handleDisplayData = () => {
        let newSet = new Set([...savedTheatres,...selectedLocations])
        let updatedTheeatres = [...newSet]
        return updatedTheeatres
    }

    const totalPages = Math.ceil(handleDisplayData().length/recordsPerPage)

    useEffect(() => {

        if (!searchLocationValue) {
            // empty search values and cancel any out going request.
            setSearchLocationResults([]);
            if (searchLocationQuery.cancel) searchLocationQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchTheatres, 300);

        setSearchLocationQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchLocationValue]);

    const fetchTheatres = () => {
        getTheatres(searchLocationValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    // name: `Dr. ${item.surname}`,
                    ...item
                }));
                setSearchLocationResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                setSearchLocationValue([]);
            })
    };

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
            name : "Recovery",
            alignment : "flex-end"
        },
    ]

    const onPressItem = (item) =>{
        let updatedLocations = [...selectedLocations]
        selectedLocations.includes(item) ?
            updatedLocations = updatedLocations.filter( location => location !== item)
            :
            updatedLocations = [...updatedLocations,item]
        setSelectedLocations(updatedLocations)
    } 

    onPressResultItem = (item) => {
        let updatedLocations = [...selectedLocations]
        selectedLocations.includes(item) ?
            updatedLocations = [...updatedLocations]
            :
            updatedLocations = [...updatedLocations,item]
        setSelectedLocations(updatedLocations)
    }

    const buttonPress = () => {
        if(isDisable === false){
            updatedTheeatres = handleDisplayData()
            onFieldChange('supportedRooms')(updatedTheeatres.map( item => item._id)) 
            getSavedTheatres(updatedTheeatres)
        }
        setIsDisable(true)
    }

    const listItem = (item) => {
        let recovery = item.hasRecovery ? "Yes" : "No"
        const recoveryColor = item.hasRecovery ? "#38A169" : '#DD6B20'

        return (
            
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>onPressItem(item)}> 
                <View style={styles.itemContainer}>
                    <Text style={{color:'#3182CE', fontSize:16}}>{item.name}</Text>
                </View>
                <View style={[styles.itemContainer,{alignItems:'flex-end'}]}>
                    <Text style={{color:recoveryColor, fontSize:14}}>{recovery}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    let dataToDisplay = handleDisplayData()
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);
    
    return (
        <View style={styles.sectionContainer}>

            <View style={[styles.container,styles.addNewContainer]}>
                    <MultipleSelectionsField
                        label={"Add New Location"}
                        onOptionsSelected = {(value)=>{setSelectedLocations(value)}}
                        options = {searchLocationResults}
                        searchText = {searchLocationValue}
                        onSearchChangeText = {(value)=> setSearchLocationValue(value)}
                        onClear={()=>{setSearchLocationValue('')}}
                    />
            </View>
            
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
                    
                    <View style={[styles.buttonContainer,{
                        backgroundColor: isDisable ? "#F8FAFB" : "#4299E1",
                        color: isDisable ? "#4299E1" : "#F8FAFB"
                    }]}>
                        <Button
                            backgroundColor = {isDisable ? "#F8FAFB" : "#4299E1"}
                            buttonPress = {()=>{buttonPress()}}
                            title = "DONE"
                            color = {isDisable ? "#4299E1" : "#F8FAFB"}
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
        marginTop:50,
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