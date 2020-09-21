import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";

import Page from '../../components/common/Page/Page';
import ListItem from '../../components/common/List/ListItem';
import RoundedPaginator from '../../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ActionItem from "../../components/common/ActionItem";
import NavPage from '../../components/common/Page/NavPage';

import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";

import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';

import {connect} from 'react-redux';
import {setProcedures} from "../../redux/actions/proceduresActions";
import {getProcedures} from "../../api/network";
import _ from "lodash";

import { useModal} from 'react-native-modalfy';
import {LONG_PRESS_TIMER} from '../../const';

const Procedures = (props) => {

    // ############# Const data
    const recordsPerPage = 10;
    const modal = useModal();
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

    //  ############ Props
    const {procedures = [], setProcedures, navigation} = props;

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedProcedures, setSelectedProcedures] = useState([])

    // const routeName = route.name;
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

    const handleOnItemPress = (item, isOpenEditable) => () => {
        // console.log("Open")
        navigation.navigate('Procedures List', {
            screen: 'Procedure',
            initial: false,
            params: {procedure: item, isOpenEditable: isOpenEditable}
        });
        // modal.openModal('BottomSheetModal',{
        //     content : <ProceduresBottomSheet procedure = {item} isOpenEditable = {isOpenEditable}/>
        // })
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

        let currentPosition = pagePosition ? pagePosition  : 1;
        setCurrentPagePosition(currentPosition)

        setFetchingData(true)
        getProcedures(searchValue, recordsPerPage, currentPosition)
            .then(proceduresResult => {
                const { data = [], pages = 0 } = proceduresResult

                if(pages === 1){
                    setPreviousDisabled(true);
                    setNextDisabled(true);
                }else if(currentPosition === 1 ){
                    setPreviousDisabled(true);
                    setNextDisabled(false);
                }else if(currentPosition === pages){
                    setNextDisabled(true);
                    setPreviousDisabled(false);
                }else if(currentPosition < pages){
                    setNextDisabled(false);
                    setPreviousDisabled(false)
                }else{
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                }

                setProcedures(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages)
                // setTotalPages(Math.ceil(data.length / recordsPerPage))

            })
            .catch(error => {
                console.log("failed to get procedures", error);
                setTotalPages(1)
                setPreviousDisabled(true)
                setNextDisabled(true)
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
            onItemPress={handleOnItemPress(item, false)}
            itemView={procedureItem(item)}
        />
    }

    const procedureItem = (item) => {
        const { physician = {} } = item
        const { firstName = "", surname = ""} = physician
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
            <LongPressWithFeedback pressTimer={LONG_PRESS_TIMER.MEDIUM} onLongPress={() => {
            }}>
                <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {
                }} touchable={false}/>
            </LongPressWithFeedback>;
        const createCopy = <ActionItem title={"Create Copy"} icon={<AddIcon/>} onPress={openCreateCopy}/>;
        const createNewProcedure = <ActionItem title={"New Procedure"} icon={<AddIcon/>}
                                               onPress={openCreateProcedure}/>;


        return <ActionContainer
            floatingActions={[
                // deleteAction,
                // createCopy,
                createNewProcedure
            ]}
            title={"PROCEDURES ACTIONS"}
        />
    };

    const openCreateProcedure = () => {
        modal.closeModals('ActionContainerModal');

        navigation.navigate('CreateProcedure', {
            screen : 'CreateProcedure',
            initial : false,
            onCancel : ()=>{{navigation.goBack();setFloatingAction(false)}},
            onCreated : ()=>{{navigation.goBack();setFloatingAction(false)}},
        })
    }

    const openCreateCopy = () => {
        modal.closeModals('ActionContainerModal');

        navigation.navigate('Procedures List', {
            screen : 'CreateCopy',
            initial : false,
        })
    }

    // ############# Prepare list data

    let proceduresToDisplay = [...procedures];
    // proceduresToDisplay = proceduresToDisplay.slice(currentPageListMin, currentPageListMax);


    return (
        <NavPage
            isFetchingData={isFetchingData}
            onRefresh={handleDataRefresh}
            placeholderText={"Search by Procedure, or Physician"}
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName={"Procedures"}
            listData={proceduresToDisplay}
            listHeaders={listHeaders}
            itemsSelected={selectedProcedures}
            onSelectAll={handleOnSelectAll}
            listItemFormat={renderProcedureFn}
            totalPages={totalPages}
            currentPage={currentPagePosition}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            isDisabled={isFloatingActionDisabled}
            toggleActionButton={toggleActionButton}
            hasPaginator = {true}
            hasActionButton = {true}
            hasActions = {true}
            isNextDisabled = {isNextDisabled}
            isPreviousDisabled = {isPreviousDisabled}
        />
    )
}

const mapStateToProps = (state) => ({
    procedures: state.procedures
});

const mapDispatcherToProp = {
    setProcedures
};

export default connect(mapStateToProps, mapDispatcherToProp)(Procedures)

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
