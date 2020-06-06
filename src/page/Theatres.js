import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import Page from "../components/common/Page/Page";
import IconButton from "../components/common/Buttons/IconButton";
import ActionIcon from "../../assets/svg/ActionIcon";
import ListItem from "../components/common/List/ListItem";
import {getTheatres} from "../api/network";
import {setTheatres} from "../redux/actions/theatresActions";
import {connect} from 'react-redux'
import {useModal} from "react-native-modalfy";
import CaseFileBottomSheet from "../components/CaseFiles/CaseFileBottomSheet";
import TheatresBottomSheetContainer from "../components/Theatres/TheatresBottomSheetContainer";
import RoundedPaginator from "../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../components/common/FloatingAction/FloatingActionButton";
import {useNextPaginator, usePreviousPaginator} from "../helpers/caseFilesHelpers";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionItem from "../components/common/ActionItem";
import WasteIcon from "../../assets/svg/wasteIcon";
import AddIcon from "../../assets/svg/addIcon";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import CreateStorageDialogContainer from "../components/Storage/CreateStorageDialogContainer";
import CreateTheatreDialogContainer from "../components/Theatres/CreateTheatreDialogContainer";
import AssignIcon from "../../assets/svg/assignIcon";


const listHeaders = [
    {
        id: "1",
        name: "Theatre",
        alignment: "flex-start",
        flex: 2
    },
    {
        id: "2",
        name: "Status",
        alignment: "center",
        flex: 1
    },
    {
        id: "3",
        name: "Recovery",
        alignment: "center",
        flex: 1
    },
    {
        id: "3",
        name: "Actions",
        alignment: "center"
        ,
        flex: 1
    }
];


const testData = [
    {
        id: "1",
        name: "Operating Room 1",
        status: "In Use",
        available: false,
        isRecovery: true,
    },
    {
        id: "2",
        name: "Operating Room 2",
        status: "Available",
        available: true,
        isRecovery: "",
    },
    {
        id: "3",
        name: "Operating Room 3",
        status: "Available",
        available: true,
        isRecovery: "",
    },
    {
        id: "4",
        name: "Operating Room 4",
        status: "Available",
        available: true,
        isRecovery: "",
    },
    {
        id: "5",
        name: "Operating Room 5",
        status: "In Use",
        available: false,
        isRecovery: false,
    },
    {
        id: "6",
        name: "Operating Room 5",
        status: "In Use",
        available: false,
        isRecovery: false,
    },
    {
        id: "7",
        name: "Operating Room 5",
        status: "In Use",
        available: false,
        isRecovery: false,
    },

];


function Theatres(props) {

    const {
        theatres = [],
        setTheatres
    } = props;

    const pageTitle = "Theatres";
    const modal = useModal();
    const recordsPerPage = 10;

    // ##### States
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);


    // ##### Lifecycle Methods functions

    // on mount
    useEffect(() => {
        if (!theatres.length) fetchTheatres();
        setTotalPages(Math.ceil(theatres.length / recordsPerPage));
    }, []);

    // ##### Handler functions

    const onSearchChange = () => {
    };

    const onItemPress = (item) => () => {
        // console.log("item press", item);
        modal.openModal('BottomSheetModal', {
            content: <TheatresBottomSheetContainer theatre={item}/>
        })
    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const onRefresh = () => {
        fetchTheatres()
    };

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length !== theatres.length;
        if (indeterminate) {
            const selectedAllIds = [...theatres.map(caseItem => caseItem.id)];
            setSelectedIds(selectedAllIds)
        } else {
            setSelectedIds([])
        }
    };

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

    const onCheckBoxPress = (item) => () => {
        
        const {id} = item;
        let updatedCases = [...selectedIds];

        if (updatedCases.includes(id)) {
            updatedCases = updatedCases.filter(id => id !== item.id)
        } else {
            updatedCases.push(item.id);
        }

        setSelectedIds(updatedCases);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "STORAGE ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    };

    // ##### Helper functions
    const theatreItem = ({name, recoveryStatus, recoveryStatusColor, status, statusColor}, onActionPress) => <>
        <View style={[styles.item, {flex: 2, ...styles.rowBorderRight}]}>
            <Text style={{color: "#3182CE", fontSize: 16}}>
                {name}
            </Text>
        </View>
        <View style={[
            styles.item, {flex: 1, justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText, {color: statusColor}]}>
                {status}
            </Text>
        </View>
        <View style={[
            styles.item, {flex: 1, justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText, {color: recoveryStatusColor}]}>
                {recoveryStatus}
            </Text>
        </View>
        <View style={[styles.item, {flex: 1, justifyContent: "center"}]}>
            <IconButton
                Icon={<AssignIcon/>}
                onPress={onActionPress}
            />
        </View>
    </>;

    const getFabActions = () => {

        const deleteAction =
            <View style={{borderRadius: 6, flex: 1, overflow: 'hidden'}}>
                <LongPressWithFeedback pressTimer={1200} onLongPress={() => {
                }}>
                    <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {
                    }} touchable={false}/>
                </LongPressWithFeedback>
            </View>;


        const createAction = <ActionItem title={"Create Theatre"} icon={<AddIcon/>} onPress={
            openCreateTheatreModel
        }/>;

        return <ActionContainer
            floatingActions={[
                deleteAction,
                createAction
            ]}
            title={"STORAGE ACTIONS"}
        />
    };

    const openCreateTheatreModel = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal.openModal(
                'OverlayModal',
                {
                    content: <CreateTheatreDialogContainer
                        onCreated={(item) => onItemPress(item)()}
                        onCancel={() => setFloatingAction(false)}
                    />,
                    onClose: () => setFloatingAction(false)
                })
        }, 200)
    };

    const renderItem = (item) => {
        const availableColor = "#38A169";
        const inUseColor = "#DD6B20";

        const formattedItem = {
            name: item.name || "",
            recoveryStatus: item.isRecovery && !item.available ? "Yes" : !item.available ? 'No' : '--',
            recoveryStatusColor: item.isRecovery && !item.available ? availableColor : '#4E5664',
            status: item.available ? "Available" : "In-Use",
            statusColor: item.available ? availableColor : inUseColor
        };

        // console.log("Formatted Item: ", formattedItem)

        const onActionClick = () => {
        };

        const itemView = theatreItem(
            formattedItem,
            onActionClick
        );

        return <ListItem
            isChecked={selectedIds.includes(item.id)}
            onCheckBoxPress={onCheckBoxPress(item)}
            onItemPress={onItemPress(item)}
            itemView={itemView}
        />
    };

    const fetchTheatres = () => {
        setFetchingData(true);
        getTheatres()
            .then(data => {
                // console.log("get theatres", data);
                setTheatres(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage));
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to fetch theatres", error);
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    let theatreToDisplay = [...theatres];
    theatreToDisplay = theatreToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <View style={styles.container}>
            <Page
                placeholderText={"Search by heading or entry below."}
                routeName={pageTitle}
                listData={theatreToDisplay}
                listItemFormat={renderItem}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listHeaders={listHeaders}
                changeText={onSearchInputChange}
                onRefresh={onRefresh}
                isFetchingData={isFetchingData}
                onSelectAll={onSelectAll}
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
    );
}

Theatres.propTypes = {};
Theatres.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 14,
        color: "#4E5664",
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    },
    rowBorderRight: {
        borderRightColor: "#E3E8EF",
        borderRightWidth: 1,
        marginRight: 20,
    }
});

const mapStateToProps = (state) => {
    const theatres = state.theatres.map(item => {

        return {
            ...item,
            id: item._id
        }
    });

    return {
        theatres
    }
};

const mapDispatchToProps = {
    setTheatres
};

export default connect(mapStateToProps, mapDispatchToProps)(Theatres);
