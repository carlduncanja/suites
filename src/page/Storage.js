import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import Page from "../components/common/Page/Page";
import IconButton from "../components/common/Buttons/IconButton";
import ActionIcon from "../../assets/svg/ActionIcon";
import ListItem from "../components/common/List/ListItem";
import LevelIndicator from "../components/common/LevelIndicator/LevelIndicator";
import {numberFormatter} from "../utils/formatter";
import {useModal} from "react-native-modalfy";
import StorageBottomSheetContainer from "../components/Storage/StorageBottomSheetContainer";
import {getStorage} from "../api/network";
import {setStorage} from "../redux/actions/storageActions";
import {connect} from "react-redux";
import RoundedPaginator from "../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../components/common/FloatingAction/FloatingActionButton";
import {useNextPaginator, usePreviousPaginator} from "../helpers/caseFilesHelpers";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import WasteIcon from "../../assets/svg/wasteIcon";
import AddIcon from "../../assets/svg/addIcon";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import CreateStorageDialogContainer from "../components/Storage/CreateStorageDialogContainer";
import CreateTheatreDialogContainer from "../components/Theatres/CreateTheatreDialogContainer";


const listHeaders = [
    {
        name: "Room Name",
        alignment: "flex-start"
    },
    {
        name: "In Stock",
        alignment: "center"
    },
    {
        name: "Capacity",
        alignment: "center"
    }
];

const testData = [
    {
        id: "1",
        name: "OR1: Cabinet 1",
        stock: 3182,
        capacity: 5000,
    },
    {
        id: "2",
        name: "OR1: Cabinet 2",
        stock: 6192,
        capacity: 10000,
    },
    {
        id: "3",
        name: "OR1: Cabinet 3",
        stock: 2014,
        capacity: 5000,
    },
    {
        id: "4",
        name: "OR1: Cabinet 4",
        stock: 541,
        capacity: 5000,
    },
    {
        id: "5",
        name: "OR1: Cabinet 5",
        stock: 4001,
        capacity: 5000,
    },
    {
        id: "6",
        name: "OR1: Cabinet 6",
        stock: 8921,
        capacity: 10000,
    },

];


function Storage(props) {
    const {
        storageLocations = testData,
        setStorage,
    } = props;

    const pageTitle = "Storage";
    const recordsPerPage = 10;
    const modal = useModal();

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


    // ############# Life Cycle Methods

    useEffect(() => {
        if (!storageLocations.length) fetchStorageData();
        setTotalPages(Math.ceil(storageLocations.length / recordsPerPage));
    }, []);


    // ############# Event Handlers

    const onRefresh = () => {
        fetchStorageData()
    };

    const onSearchChange = () => {

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

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length !== storageLocations.length;
        // console.log("Indeterminate: ", indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...storageLocations.map(item => item.id)];
            setSelectedIds(selectedAllIds)
        } else {
            setSelectedIds([])
        }
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

    const onItemPress = (item) => () => {
        modal.openModal('BottomSheetModal', {
            content: <StorageBottomSheetContainer storage={item}/>
        })
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
    const storageItem = ({name, stock, levels}) => <>
        <View style={[styles.item, {justifyContent: 'space-between'}]}>
            <Text style={{color: "#3182CE", fontSize: 16}}>
                {name}
            </Text>
            <View style={{
                width: 1,
                height: 24,
                backgroundColor: "#E3E8EF",
                marginRight: 20
            }}/>
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText]}>
                {numberFormatter(stock)}
            </Text>
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            {/*   LEVELS    */}
            <LevelIndicator
                max={levels.max}
                min={0}
                level={stock}
                ideal={levels.ideal}
                critical={levels.critical}
            />
        </View>
    </>;

    const fetchStorageData = () => {
        setFetchingData(true);
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

    const renderItem = (item) => {

        const formattedItem = {
            name: item.name,
            stock: item.stock,
            levels: {
                min: 0,
                max: item.capacity
            }
        };

        const itemView = storageItem(
            formattedItem,
        );

        return <ListItem
            isChecked={selectedIds.includes(item.id)}
            onCheckBoxPress={onCheckBoxPress(item)}
            onItemPress={onItemPress(item)}
            itemView={itemView}
        />
    };

    const getFabActions = () => {

        const deleteAction =
            <View style={{borderRadius: 6, flex: 1, overflow: 'hidden'}}>
                <LongPressWithFeedback pressTimer={1200} onLongPress={() => {
                }}>
                    <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {
                    }} touchable={false}/>
                </LongPressWithFeedback>
            </View>;


        const createAction = <ActionItem title={"New Location"} icon={<AddIcon/>} onPress={
            openCreateStorageModel
        }/>;

        return <ActionContainer
            floatingActions={[
                deleteAction,
                createAction
            ]}
            title={"STORAGE ACTIONS"}
        />
    };

    const openCreateStorageModel = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreateStorageDialogContainer
                            onCreated={(item) => onItemPress(item)()}
                            onCancel={() => setFloatingAction(false)}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    };

    let storageToDisplay = [...storageLocations];
    storageToDisplay = storageToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <View style={styles.container}>
            <Page
                placeholderText={"Search by heading or entry below."}
                routeName={pageTitle}
                listData={storageToDisplay}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listItemFormat={renderItem}
                listHeaders={listHeaders}
                changeText={onSearchChange}
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

Storage.propTypes = {};
Storage.defaultProps = {};


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
});
const mapStateToProps = (state) => ({
    storageLocations: state.storage
});

const mapDispatcherToProp = {
    setStorage
};

export default connect(mapStateToProps, mapDispatcherToProp)(Storage);
