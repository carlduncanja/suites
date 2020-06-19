import React,{useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet } from "react-native";

import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import ScaleBar from '../components/common/ScaleBar';

import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../helpers/caseFilesHelpers';

import {connect} from 'react-redux';
import { setStorage } from "../redux/actions/storageActions";
import { getStorage } from "../api/network";

import { withModal } from 'react-native-modalfy';

const StorageLocations = (props) => {

    // ############# Const data

    const recordsPerPage = 10;
    const listHeaders = [
        {   
            name : "Room Name",
            alignment : "flex-start"
        },
        {   
            name : "In-Stock",
            alignment : "center"
        },
        {   
            name : "Capacity",
            alignment : "center"
        }
    ];
    const floatingActions = []

    //  ############ Props

    const {storage, setStorage, navigation, modal} = props;

    //  ############ State
    
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [selectedStorageIds, setSelectedStorageIds] = useState([])

    // ############# Lifecycle methods

    useEffect(() => {
        if (!storage.length) {
            fetchStorageData()
        }
    }, []);

    // ############# Event Handlers

    const handleDataRefresh = () => {
        fetchStorageData()
    };

    const handleOnSelectAll = () => {
        let updatedStorageList = selectAll(storage,selectedStorageIds)
        setSelectedStorageIds(updatedStorageList)
    }

    const handleOnCheckBoxPress = (item) => () =>{
        const { id } = item;
        console.log("Item: ", item)
        let updatedStorageList = checkboxItemPress(item, id, selectedStorageIds)
        setSelectedStorageIds(updatedStorageList)
        console.log("Locations checked: ", updatedStorageList)
    }

    const handleOnItemPress = (item) => {

    }

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const toggleActionButton = () => {
        setFloatingAction(!isFloatingActionDisabled)
        modal.openModal("ActionContainerModal",{ floatingActions, title : "STORAGE ACTIONS" })
    }

    // ############# Helper functions

    const fetchStorageData = () => {
        setFetchingData(true)
        getStorage()
            .then(data => {
                setStorage(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log("failed to get storage", error);
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    const renderStorageFn = (item) => {
        return <ListItem
            hasCheckBox={true}
            isChecked={selectedStorageIds.includes(item.id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item)}
            itemView={storageItem(item)}
        />
    }

    const roomNameItem = (room, location) => {
        return `${room}: ${location}`
    }

    const storageItem = (item) => <>
        <View style={{width:'40%', marginRight:20, borderRightColor:'#CCD6E0', borderRightWidth: 1}}>
            <Text style={{color:'#323843', fontSize: 16}}>{roomNameItem(item.room, item.location)}</Text>
        </View>
        <View style={{flex:1,}}>
            <Text style={{color:'#4E5664', fontSize: 16}}>{item.currentStock}</Text>
        </View>
        <View style={{flex:1, alignItems:'center', flexDirection:'row', justifyContent:'space-evenly'}}>
            <Text style={{color:'#718096', fontSize:12}}>0</Text>
            <ScaleBar 
                currentScaleNumber = {item.currentStock} 
                endScaleNumber = { item. capacity}
                numberOfDivisions = {5}
            />
            <Text style={{color:'#718096', fontSize:12}}>{item.capacity}</Text>
        </View>
    </>

    // ############# Prepare list data

    let storageToDisplay = [...storage];
    storageToDisplay = storageToDisplay.slice(currentPageListMin, currentPageListMax);

    return(
        <View style={{flex:1}}>
            <Page
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by Room Name"}
                // changeText={changeText}
                // inputText={textInput}
                routeName={"Storage"}
                listData={storageToDisplay}

                listHeaders={listHeaders}
                itemsSelected={selectedStorageIds}
                onSelectAll={handleOnSelectAll}
                
                listItemFormat={renderStorageFn}
            />

            <View style={styles.footer}>
                <View style={{alignSelf: "center", marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>

                <FloatingActionButton
                    isDisabled = {isFloatingActionDisabled}
                    toggleActionButton = {toggleActionButton}
                />
            </View>

        </View>
    )
}

const mapStateToProps = (state) => ({
    storage: state.storage
});

const mapDispatcherToProp = {
    setStorage
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(StorageLocations))

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
})