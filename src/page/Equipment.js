import React,{ useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import EquipmentBottomSheet from '../components/Equipment/EquipmentBottomSheet';

import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../helpers/caseFilesHelpers';
import EquipmentListIcon from '../../assets/svg/equipmentListAction';

import {connect} from 'react-redux';
import { setEquipment } from "../redux/actions/equipmentActions";
import { getEquipment, getEquipmentTypes } from "../api/network";

import { withModal } from 'react-native-modalfy';
import moment from "moment";

import equipmentTest from '../../data/Equipment';

const Equipment = (props) => {

    // ############# Const data
    const recordsPerPage = 15;
    const listHeaders = [
        {   
            name : "Assigned",
            alignment : "flex-start"
        },
        {   
            name : "Quantity",
            alignment : "center"
        },
        {   
            name : "Status",
            alignment : "flex-start"
        },
        {   
            name : "Available on",
            alignment : "center"
        },
        {   
            name : "Actions",
            alignment : "center"
        }
    ];
    const floatingActions = []

    //  ############ Props
    const {equipment, setEquipment, navigation, modal} = props;

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [selectedEquipmentIds, setSelectedEquipmentIds] = useState([])
    const [equipmentTypes, setEquipmentTypes] = useState([])

    // ############# Lifecycle methods

    useEffect(() => {
        if (!equipment.length) {
            fetchEquipmentData()
        }
        setTotalPages(Math.ceil(equipment.length / recordsPerPage))
    }, []);

    // ############# Event Handlers

    const handleDataRefresh = () => {
        fetchEquipmentData()
    };

    const handleOnSelectAll = () => {
        let updatedEquipmentList = selectAll(equipment,selectedEquipmentIds)
        setSelectedEquipmentIds(updatedEquipmentList)
    }

    const handleOnCheckBoxPress = (item) => () =>{
        const { id } = item;
        let updatedEquipmentList = checkboxItemPress(item, id, selectedEquipmentIds)
 
        setSelectedEquipmentIds(updatedEquipmentList)
    }

    const handleOnItemPress = (item) => {
        modal.openModal('BottomSheetModal',{
            content : <EquipmentBottomSheet equipment = {item}/>
        })
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
        modal.openModal("ActionContainerModal",{ floatingActions, title : "EQUIPMENT ACTIONS" })
    }

    // ############# Helper functions
    const fetchEquipmentData = () => {
        setFetchingData(true)
        getEquipmentTypes()
            .then(data => {
                setEquipmentTypes(data)
            })
            .catch(error => {
                console.log("Failed to get equipment types", error)
            })
        getEquipment()
            .then(data => {
                setEquipment(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log("failed to get equipment", error);
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    const renderEquipmentFn = (item) => {
        // change to eqItem.type._id
        const filterEquiments = equipment.filter( eqItem => eqItem.type === item._id)
        const filterStatus = filterEquiments.filter( eqItem => eqItem.status === 'Available')
        const viewItem = {
            name : item.name,
            quantity : [].length,
            status : [].length === 1 ? "Available" : filterStatus.length > 1 ? "Multiple" : "Unavailable",
            nextAvailable : new Date(2020,12,12)
        }

        return <ListItem
            hasCheckBox={true}
            isChecked={selectedEquipmentIds.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item)}
            itemView={equipmentItem(viewItem)}
        />
    }

    const getStatusColor = (status) => {
        return status === 'Unavailable' ? '#C53030' 
            : status === 'Multiple' ? '#6B46C1'
            : status === 'Available' ? '#4E5664'
            : '#4E5664'
    }

    const equipmentItem = (item) => <>
        <View style={{flex:1}}>
            <Text style={{fontSize:16, color:'#323843'}}>{item.name}</Text>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:16, color:'#4E5664'}}>{item.quantity}</Text>
        </View>
        <View style={{flex:1}}>
            <Text style={{fontSize:14, color: getStatusColor(item.status)}}>{item.status}</Text>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:14, color:'#4E5664'}}>{moment(item.nextAvailable).format("DD/MM/YYYY")}</Text>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
            {<EquipmentListIcon/>}
        </View>
    </>

    // ############# Prepare list data

    let equipmentToDisplay = [...equipmentTypes];
    equipmentToDisplay = equipmentToDisplay.slice(currentPageListMin, currentPageListMax);

    return(
        <View style={{flex:1}}>
            <Page
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by Assigned Equipment"}
                // changeText={changeText}
                // inputText={textInput}
                routeName={"Equipment"}
                listData={equipmentToDisplay}

                listHeaders={listHeaders}
                itemsSelected={selectedEquipmentIds}
                onSelectAll={handleOnSelectAll}
                
                listItemFormat={renderEquipmentFn}
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

const mapStateToProps = (state) => {
    const equipment = state.equipment.map( item =>{
        return {
            ...item
        }
    })
    return { equipment }
};

const mapDispatcherToProp = {
    setEquipment
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Equipment))

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