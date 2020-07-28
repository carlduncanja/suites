import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";

import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import ProceduresBottomSheet from '../components/Procedures/ProceduresBottomSheet';
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import CreateProcedureDialog from '../components/Procedures/CreateProcedureDialogContainer';

import WasteIcon from "../../assets/svg/wasteIcon";
import AddIcon from "../../assets/svg/addIcon";
import AssignIcon from "../../assets/svg/assignIcon";

import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../helpers/caseFilesHelpers';

import {connect} from 'react-redux';
import {setProcedures} from "../redux/actions/proceduresActions";
import {getProcedures} from "../api/network";
import _ from "lodash";

import {withModal} from 'react-native-modalfy';
import proceduresTest from '../../data/Procedures'

const Procedures = (props) => {

    // ############# Const data
    const recordsPerPage = 15;
    const listHeaders = [
        {
            name: "Procedure",
            alignment: "flex-start",
            flex: 1.5
        },
        {
            name: "Physician",
            alignment: "center",
            flex: 1
        },
        {
            name: "Duration",
            alignment: "center",
            flex: 1
        }
    ];
    const floatingActions = []

    //  ############ Props
    const {procedures = [], setProcedures, navigation, modal} = props;

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedProcedures, setSelectedProcedures] = useState([])

    // ############# Lifecycle methods

    useEffect(() => {
        if (!procedures.length) fetchProceduresData(currentPagePosition)
        setTotalPages(Math.ceil(procedures.length / recordsPerPage))
    }, []);

    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchProceduresData(1)
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProceduresData, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
        setCurrentPagePosition(1)
    }, [searchValue]);


    // ############# Event Handlers

    const onSearchInputChange = (input) =>{
        setSearchValue(input)
    }

    const handleDataRefresh = () => {
        fetchProceduresData()
    };

    const handleOnSelectAll = () => {
        let updatedProceduresList = selectAll(procedures, selectedProcedures)
        setSelectedProcedures(updatedProceduresList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const {_id} = item;
        let updatedProcedures = checkboxItemPress(item, _id, selectedProcedures)

        setSelectedProcedures(updatedProcedures)
    }

    const handleOnItemPress = (item, isOpenEditable) => {
        modal.openModal('BottomSheetModal',{
            content : <ProceduresBottomSheet procedure = {item} isOpenEditable = {isOpenEditable}/>
        })
    }

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchProceduresData(currentPage)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchProceduresData(currentPage)
    };

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "PROCEDURES ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }

    // ############# Helper functions

    const fetchProceduresData = (pagePosition) => {
        pagePosition ? pagePosition : 1;
        setFetchingData(true)
        getProcedures(searchValue, recordsPerPage, pagePosition)
            .then(procedureResult => {
                console.log("Result: ", procedureResult)
                const { data = [], pages = 0 } = procedureResult
                console.log("ProData: ", data)
                setProcedures(data);
                setTotalPages(pages)
                // setTotalPages(Math.ceil(data.length / recordsPerPage))

            })
            .catch(error => {
                // console.log("failed to get procedures", error);
                Alert.alert("Failed", "Failure occurred when retrieving Procedure data.")
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    const renderProcedureFn = (item) => {
        return <ListItem
            hasCheckBox={true}
            isChecked={selectedProcedures.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={procedureItem(item)}
        />
    }

    const procedureItem = (item) => {
        const { physician = {} } = item
        const { firstName = "", surname = ""} = physician
        // const physician = `Dr. ${item.physician.firstName} ${item.physician.surname}`;
        return (
            <>
                <View style={[styles.item,{...styles.rowBorderRight, flex: 1.5}]}>
                    <Text numberOfLines={1} style={[styles.itemText, {color:"#323843"}]}>{item.name}</Text>
                </View>
                <View style={[styles.item, {flex: 1, alignItems: 'flex-start'}]}>
                    <Text numberOfLines={1} style={[styles.itemText, {color: "#3182CE"}]}>Dr. {firstName} {surname}</Text>
                </View>
                <View style={[styles.item, {flex: 1, alignItems: 'center'}]}>
                    <Text numberOfLines={1} style={[styles.itemText, {color: "#3182CE"}]}>{`${item.duration} hours`}</Text>
                </View>
            </>
        )

    }

    const getFabActions = () => {

        const deleteAction =
            <LongPressWithFeedback pressTimer={700} onLongPress={() => {
            }}>
                <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {
                }} touchable={false}/>
            </LongPressWithFeedback>;
        const createCopy = <ActionItem title={"Create Copy"} icon={<AddIcon/>} onPress={() => {
        }}/>;
        const createNewProcedure = <ActionItem title={"New Procedure"} icon={<AddIcon/>}
                                               onPress={openCreateProcedure}/>;


        return <ActionContainer
            floatingActions={[
                deleteAction,
                createCopy,
                createNewProcedure
            ]}
            title={"PROCEDURES ACTIONS"}
        />
    };

    const openCreateProcedure = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreateProcedureDialog
                            onCancel={() => setFloatingAction(false)}
                            onCreated={(item) => {handleOnItemPress(item, true); handleDataRefresh()}}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }

    // ############# Prepare list data

    let proceduresToDisplay = [...procedures];
    // proceduresToDisplay = proceduresToDisplay.slice(currentPageListMin, currentPageListMax);


    return (
        <View style={{flex: 1}}>
            <Page
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by Procedure"}
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName={"Procedures"}
                listData={proceduresToDisplay}
                listHeaders={listHeaders}
                itemsSelected={selectedProcedures}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderProcedureFn}
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
                    isDisabled={isFloatingActionDisabled}
                    toggleActionButton={toggleActionButton}
                />
            </View>

        </View>
    )
}

const mapStateToProps = (state) => ({
    procedures: state.procedures
});

const mapDispatcherToProp = {
    setProcedures
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Procedures))

const styles = StyleSheet.create({
    item: {
        // flex:1
    },
    itemText: {
        fontSize: 16
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
    rowBorderRight: {
        borderRightColor: "#E3E8EF",
        borderRightWidth: 1,
        marginRight: 20,
    }
})
