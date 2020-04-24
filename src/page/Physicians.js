import React,{useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet } from "react-native";

import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import PhysicianActionIcon from '../../assets/svg/physicianListAction';
import PhysicianBottomSheet from '../components/Physicians/PhysicianBottomSheet';

import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../helpers/caseFilesHelpers';

import {connect} from 'react-redux';
import { setPhysicians } from "../redux/actions/physiciansActions";
import { getPhysicians } from "../api/network";

import { withModal } from 'react-native-modalfy';

const Physicians = (props) => {

    // ############# Const data

    const recordsPerPage = 10;
    const listHeaders = [
        {   
            name : "Name",
            alignment : "flex-start"
        },
        {   
            name : "Type",
            alignment : "center"
        },
        {   
            name : "Status",
            alignment : "center"
        },
        {   
            name : "Actions",
            alignment : "center"
        }
    ];
    const floatingActions = []

    //  ############ Props

    const {physicians, setPhysicians, navigation, modal} = props;

    //  ############ State

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [selectedPhysiciansId, setSelectedPhysiciansId] = useState([])

    // ############# Lifecycle methods

    useEffect(() => {
        if (!physicians.length) {
            fetchPhysiciansData()
        }
        setTotalPages(Math.ceil(physicians.length / recordsPerPage))
    }, []);

    // ############# Event Handlers

    const handleDataRefresh = () => {
        fetchProceduresData()
    };

    const handleOnSelectAll = () => {
        let updatedPhysiciansList = selectAll(physicians,selectedPhysiciansId)
        setSelectedPhysiciansId(updatedPhysiciansList)
    }

    const handleOnCheckBoxPress = (item) => () =>{
        const { id } = item;
        let updatedPhysiciansList = checkboxItemPress(item, id, selectedPhysiciansId)
        setSelectedPhysiciansId(updatedPhysiciansList)
    }

    const handleOnItemPress = (item) => {
        modal.openModal('BottomSheetModal',{
            content : <PhysicianBottomSheet physician = {item} />
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
        modal.openModal("ActionContainerModal",{ floatingActions, title : "PHYSICIAN ACTIONS" })
    }

    // ############# Helper functions

    const fetchPhysiciansData = () => {
        setFetchingData(true)
        getPhysicians()
            .then(data => {
                setPhysicians(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log("failed to get physicians", error);
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    const renderPhysiciansFn = (item) => {
        return <ListItem
            hasCheckBox={true}
            isChecked={selectedPhysiciansId.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item)}
            itemView={physiciansItem(item)}
        />
    }

    const statusColor = (status) => {
        return status === 'Active' ? '#4E5664' : '#E53E3E'
    }

    const physiciansItem = (item) => {
        return (
            <>
                <View style={[styles.item,{}]}>
                    <Text style={[styles.itemText,{fontSize: 12, color: "#718096"}]}>{`#${item._id}`}</Text>
                    <Text style={[styles.itemText,{fontSize: 16, color: "#3182CE"}]}>{`Dr. ${item.surname}`}</Text>
                </View>
                <View style={[styles.item,{alignItems:'center'}]}>
                    <Text style={[styles.itemText,{fontSize: 16, color: '#4E5664'}]}>{item.type}</Text>
                </View>
                <View style={[styles.item,{alignItems:'center'}]}>
                    <Text style={[styles.itemText,{fontSize: 14, color: statusColor(item.status)}]}>{item.status}</Text>
                </View>
                <View style={[styles.item,{alignItems:'center'}]}>
                    <PhysicianActionIcon/>
                </View>
            </>
        )
        
    }

    // ############# Prepare list data

    let physiciansToDisplay = [...physicians];
    physiciansToDisplay = physiciansToDisplay.slice(currentPageListMin, currentPageListMax);
   
    return(
        <View style={{flex:1}}>
            <Page
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by Physician"}
                // changeText={changeText}
                // inputText={textInput}
                routeName={"Physicians"}
                listData={physiciansToDisplay}

                listHeaders={listHeaders}
                itemsSelected={selectedPhysiciansId}
                onSelectAll={handleOnSelectAll}
                
                listItemFormat={renderPhysiciansFn}
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
};

const mapStateToProps = (state) => {

    const physicians = state.physicians.map( item => {
        return {
            ...item,
            type : 'Neurosurgeon',
            status : 'Active'
        }
    })

    return {
        physicians
    }
    // physicians: state.physicians
};

const mapDispatcherToProp = {
    setPhysicians
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Physicians))

const styles = StyleSheet.create({
    item: {
        flex:1
    },
    itemText:{

    },
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