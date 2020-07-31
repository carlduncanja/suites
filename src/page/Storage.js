import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import Page from "../components/common/Page/Page";
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
import {useNextPaginator, usePreviousPaginator, selectAll, checkboxItemPress} from "../helpers/caseFilesHelpers";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import WasteIcon from "../../assets/svg/wasteIcon";
import AddIcon from "../../assets/svg/addIcon";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import CreateStorageDialogContainer from "../components/Storage/CreateStorageDialogContainer";
import NavPage from '../components/common/Page/NavPage';
import _ from "lodash";


const listHeaders = [
    {
        name: "Room Name",
        alignment: "flex-start",
        flex: 1.5
    },
    {
        name: "In Stock",
        alignment: "center",
        flex: 1,
    },
    {
        name: "Capacity",
        alignment: "center",
        flex: 1
    }
];


function Storage(props) {
    const {
        storageLocations = [],
        setStorage,
    } = props;

    const pageTitle = "Storage";
    const recordsPerPage = 10;
    const modal = useModal();

    // ##### States
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedIds, setSelectedIds] = useState([]);

    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    // ############# Life Cycle Methods

    useEffect(() => {
        if (!storageLocations.length) fetchStorageData(currentPagePosition);
        setTotalPages(Math.ceil(storageLocations.length / recordsPerPage));
    }, []);

    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchStorageData(1)
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchStorageData, 300);

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

    const onRefresh = () => {
        fetchStorageData()
    };

    const onSearchChange = (input) => {
        setSearchValue(input)
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchStorageData(currentPage)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchStorageData(currentPage)

    };

    const onSelectAll = () => {
        let updatedStorage = selectAll(storageLocations, selectedIds)
        setSelectedIds(updatedStorage)

    };

    const onCheckBoxPress = (item) => () => {
        const {_id} = item;
        let updatedStorage = checkboxItemPress(item, _id, selectedIds)
        setSelectedIds(updatedStorage);

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
        <View style={[styles.item, {flex: 1.5, justifyContent: 'space-between', ...styles.rowBorderRight}]}>
            <Text style={{color: "#3182CE", fontSize: 16}}>
                {name}
            </Text>
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

    const fetchStorageData = (pagePosition) => {
        pagePosition ? pagePosition : 1;
        setCurrentPagePosition(pagePosition)
        setFetchingData(true);
        getStorage(searchValue, recordsPerPage, pagePosition)
            .then(storageResult => {
                const { data = [], pages = 0 } = storageResult

                if(pages === 1){
                    setPreviousDisabled(true);
                    setNextDisabled(true);
                }else if(pagePosition === 1 ){
                    setPreviousDisabled(true);
                    setNextDisabled(false);
                }else if(pagePosition === pages){
                    setNextDisabled(true);
                    setPreviousDisabled(false);
                }else if(pagePosition < pages){
                    setNextDisabled(false);
                    setPreviousDisabled(false)
                }else{
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                }

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

        const totalStock = item.inventoryLocations?.reduce((acc, item) => acc + item.stock, 0) || 0

        const formattedItem = {
            name: item.name,
            stock: totalStock,
            levels: {
                min: 0,
                max: item.capacity
            }
        };

        const itemView = storageItem(
            formattedItem,
        );

        return <ListItem
            isChecked={selectedIds.includes(item._id)}
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
    // storageToDisplay = storageToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <NavPage
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
    rowBorderRight: {
        borderRightColor: "#E3E8EF",
        borderRightWidth: 1,
    }
});
const mapStateToProps = (state) => ({
    storageLocations: state.storage
});

const mapDispatcherToProp = {
    setStorage
};

export default connect(mapStateToProps, mapDispatcherToProp)(Storage);
