import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";

import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import PhysicianActionIcon from '../../assets/svg/physicianListAction';
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import CreateWorkItemDialog from "../components/Physicians/CreateWorkItemDialog";
import NavPage from '../components/common/Page/NavPage';

import WasteIcon from "../../assets/svg/wasteIcon";
import AddIcon from "../../assets/svg/addIcon";
import AssignIcon from "../../assets/svg/assignIcon";

import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../helpers/caseFilesHelpers';

import { connect } from 'react-redux';
import { setPhysicians } from "../redux/actions/physiciansActions";
import { getPhysicians } from "../api/network";
import _ from "lodash";

import { withModal } from 'react-native-modalfy';
import CreatePhysicianDialogContainer from '../components/Physicians/CreatePhyscianDialogContainer';

const Physicians = (props) => {

    // ############# Const data

    const recordsPerPage = 10;
    const listHeaders = [
        {
            name: "Name",
            alignment: "flex-start"
        },
        {
            name: "Type",
            alignment: "center"
        },
        {
            name: "Status",
            alignment: "center"
        },
        {
            name: "Actions",
            alignment: "center"
        }
    ];
    const floatingActions = []

    //  ############ Props

    const { physicians, setPhysicians, navigation, modal } = props;

    //  ############ State

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedPhysiciansId, setSelectedPhysiciansId] = useState([])

    // ############# Lifecycle methods

    useEffect(() => {
        if (!physicians.length) {
            fetchPhysiciansData(currentPagePosition)
        }
        setTotalPages(Math.ceil(physicians.length / recordsPerPage))
    }, []);

    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchPhysiciansData(1)
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysiciansData, 300);

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

    const onSearchInputChange = (input) => {
        setSearchValue(input)
    }

    const handleDataRefresh = () => {
        fetchPhysiciansData()
    };

    const handleOnSelectAll = () => {
        let updatedPhysiciansList = selectAll(physicians, selectedPhysiciansId)
        setSelectedPhysiciansId(updatedPhysiciansList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        let updatedPhysiciansList = checkboxItemPress(item, _id, selectedPhysiciansId)
        setSelectedPhysiciansId(updatedPhysiciansList)
    }

    const handleOnItemPress = (item, isOpenEditable) => {
        // modal.openModal('BottomSheetModal',{
        //     content : <PhysicianBottomSheet physician = {item} isOpenEditable = {isOpenEditable}/>
        // })
        props.navigation.navigate('PhysicianPage', { initial: false, physician: item, isEdit: isOpenEditable });
    }

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchPhysiciansData(currentPage)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchPhysiciansData(currentPage)

    };

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "PHYSICIAN ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }

    // ############# Helper functions

    const fetchPhysiciansData = (pagePosition) => {

        let currentPosition = pagePosition ? pagePosition : 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getPhysicians(searchValue, recordsPerPage, currentPosition)
            .then(physicianResult => {
                const { data = [], pages = 0 } = physicianResult

                if (pages === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(true);
                } else if (currentPosition === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(false);
                } else if (currentPosition === pages) {
                    setNextDisabled(true);
                    setPreviousDisabled(false);
                } else if (currentPosition < pages) {
                    setNextDisabled(false);
                    setPreviousDisabled(false)
                } else {
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                }

                setPhysicians(data);
                data.length === 0 ? setTotalPages(0) : setTotalPages(pages)
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
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={physiciansItem(item)}
        />
    }

    const statusColor = (status) => {
        return status === 'Active' ? '#4E5664' : '#E53E3E'
    }

    const physiciansItem = (item) => {

        const { _id = "", surname = "", type = "Neurosurgeon", status = "Active" } = item
        return (
            <>
                <View style={[styles.item, {}]}>
                    {/*<Text numberOfLines={1} style={[styles.itemText, { fontSize: 12, color: "#718096" }]}>#{_id}</Text>*/}
                    <Text numberOfLines={1} style={[styles.itemText, { fontSize: 16, color: "#3182CE" }]}>Dr. {surname}</Text>
                </View>
                <View style={[styles.item, { alignItems: 'center' }]}>
                    <Text numberOfLines={1} style={[styles.itemText, { fontSize: 16, color: '#4E5664' }]}>{type}</Text>
                </View>
                <View style={[styles.item, { alignItems: 'center' }]}>
                    <Text numberOfLines={1} style={[styles.itemText, { fontSize: 14, color: statusColor(status) }]}>{status}</Text>
                </View>
                <View style={[styles.item, { alignItems: 'center' }]}>
                    <PhysicianActionIcon />
                </View>
            </>
        )

    }

    const getFabActions = () => {

        const deleteAction =
            <LongPressWithFeedback pressTimer={700} onLongPress={() => { }}>
                <ActionItem title={"Hold to Delete"} icon={<WasteIcon />} onPress={() => { }} touchable={false} />
            </LongPressWithFeedback>;
        const assignActionCase = <ActionItem title={"Assign Case"} icon={<AssignIcon />} onPress={() => { }} />;
        const createActionWorkItem = <ActionItem title={"Add Work Item"} icon={<AddIcon />} onPress={openCreateNewWorkItem} />;
        const createActionPhysician = <ActionItem title={"Add Physician"} icon={<AddIcon />} onPress={openCreatePhysicians} />;


        return <ActionContainer
            floatingActions={[
                deleteAction,
                assignActionCase,
                createActionPhysician,
                createActionWorkItem
            ]}
            title={"PHYSICIAN ACTIONS"}
        />
    };

    const openCreateNewWorkItem = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreateWorkItemDialog onCancel={() => setFloatingAction(false)}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }

    const openCreatePhysicians = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreatePhysicianDialogContainer
                            onCancel={() => setFloatingAction(false)}
                            onCreated={(item) => handleOnItemPress(item, true)}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }

    // ############# Prepare list data

    let physiciansToDisplay = [...physicians];
    // physiciansToDisplay = physiciansToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <NavPage
            isFetchingData={isFetchingData}
            onRefresh={handleDataRefresh}
            placeholderText={"Search by Physician"}
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName={"Physicians"}
            listData={physiciansToDisplay}
            listHeaders={listHeaders}
            itemsSelected={selectedPhysiciansId}
            onSelectAll={handleOnSelectAll}
            listItemFormat={renderPhysiciansFn}
            totalPages={totalPages}
            currentPage={currentPagePosition}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            isDisabled={isFloatingActionDisabled}
            toggleActionButton={toggleActionButton}
            hasPaginator={true}
            hasActionButton={true}
            hasActions={true}
            isNextDisabled={isNextDisabled}
            isPreviousDisabled={isPreviousDisabled}
        />
    )
};

const mapStateToProps = (state) => {

    const physicians = state.physicians.map(item => {
        return {
            ...item,
            // type : 'Neurosurgeon',
            // status : 'Active'
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
        flex: 1
    },
    itemText: {

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
