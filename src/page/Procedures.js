import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";

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

import {withModal} from 'react-native-modalfy';
import proceduresTest from '../../data/Procedures'

const Procedures = (props) => {

    // ############# Const data
    const recordsPerPage = 15;
    const listHeaders = [
        {
            name: "Procedure",
            alignment: "flex-start",
            flex: 2
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
    const {procedures, setProcedures, navigation, modal} = props;

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [selectedProcedures, setSelectedProcedures] = useState([])

    // ############# Lifecycle methods

    useEffect(() => {
        if (!procedures.length) fetchProceduresData()
        setTotalPages(Math.ceil(procedures.length / recordsPerPage))
    }, []);

    // ############# Event Handlers

    const handleDataRefresh = () => {
        fetchProceduresData()
    };

    const handleOnSelectAll = () => {
        let updatedProceduresList = selectAll(procedures, selectedProcedures)
        setSelectedProcedures(updatedProceduresList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const {id} = item;
        let updatedProceduresList = checkboxItemPress(item, id, selectedProcedures)

        setSelectedProcedures(updatedProceduresList)
    }

    const handleOnItemPress = (item) => {
        modal.openModal('BottomSheetModal', {
            content: <ProceduresBottomSheet procedure={item}/>
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

    const fetchProceduresData = () => {
        setFetchingData(true)
        getProcedures()
            .then(data => {
                setProcedures(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage))

            })
            .catch(error => {
                console.log("failed to get procedures", error);
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    const renderProcedureFn = (item) => {
        return <ListItem
            hasCheckBox={true}
            isChecked={selectedProcedures.includes(item.id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item)}
            itemView={procedureItem(item)}
        />
    }

    const procedureItem = (item) => {
        const physician = `Dr. ${item.physician.firstName} ${item.physician.surname}`;
        return (
            <>
                <View style={[styles.item,{...styles.rowBorderRight, flex: 2}]}>
                    <Text style={[styles.itemText, {color:"#323843"}]}>{item.name}</Text>
                </View>
                <View style={[styles.item, {flex: 1, alignItems: 'center'}]}>
                    <Text style={[styles.itemText, {color: "#3182CE"}]}>{physician}</Text>
                </View>
                <View style={[styles.item, {flex: 1, alignItems: 'center'}]}>
                    <Text style={[styles.itemText, {color: "#3182CE"}]}>{`${item.duration} hours`}</Text>
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
                            onCreated={(item) => handleOnItemPress(item)}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    }

    // ############# Prepare list data

    let proceduresToDisplay = [...procedures];
    proceduresToDisplay = proceduresToDisplay.slice(currentPageListMin, currentPageListMax);


    return (
        <View style={{flex: 1}}>
            <Page
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by Procedure"}
                // changeText={changeText}
                // inputText={textInput}
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
    // const procedures = state.procedures.map(item => {
    //     return {
    //         ...item
    //     }
    // })
    // return { procedures }
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
