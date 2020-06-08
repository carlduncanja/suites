import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, FlatList} from "react-native";
import Page from "../components/common/Page/Page";
import IconButton from "../components/common/Buttons/IconButton";
import ActionIcon from "../../assets/svg/ActionIcon";
import ListItem from "../components/common/List/ListItem";
import LevelIndicator from "../components/common/LevelIndicator/LevelIndicator";
import {numberFormatter} from "../utils/formatter";
import _ from "lodash";

import {setInventory} from "../redux/actions/InventorActions";
import {connect} from "react-redux";
import {getInventories} from "../api/network";
import {useModal} from "react-native-modalfy";
import InventoryBottomSheetContainer from "../components/Inventory/InventoryBottomSheetContainer";
import RoundedPaginator from "../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../components/common/FloatingAction/FloatingActionButton";
import {useNextPaginator, usePreviousPaginator} from "../helpers/caseFilesHelpers";
import CheckBoxComponent from "../components/common/Checkbox";
import SvgIcon from "../../assets/SvgIcon";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionItem from "../components/common/ActionItem";
import WasteIcon from "../../assets/svg/wasteIcon";
import AddIcon from "../../assets/svg/addIcon";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import CreateStorageDialogContainer from "../components/Storage/CreateStorageDialogContainer";
import CreateInventoryDialogContainer from "../components/Inventory/CreateInventoryDialogContainer";
import CollapsibleListItem from "../components/common/List/CollapsibleListItem";
import TransferIcon from "../../assets/svg/transferIcon";
import ActionCollapseIcon from "../../assets/svg/actionCollapseIcon";

const listHeaders = [
    {
        name: "Item Name",
        alignment: "flex-start",
        flex: 2
    },
    {
        name: "In Stock",
        alignment: "center"
    },
    {
        name: "Levels",
        alignment: "center"
    },
    {
        name: "Locations",
        alignment: "center"
    },
    {
        name: "Actions",
        alignment: "center"
    }
];

const testData = [
    {
        id: "1",
        name: "Agents",
        stock: 238,
        levels: {
            max: 400,
            min: 0,
            critical: 100,
            ideal: 300,
        },
        locations: 4,
    },
    {
        id: "2",
        name: "Suture Kit",
        stock: 22,
        levels: {
            max: 200,
            min: 0,
            critical: 50,
            ideal: 100,
        },
        locations: 1
    },
    {
        id: "3",
        name: "Gauze",
        stock: 632,
        levels: {
            max: 700,
            min: 0,
            critical: 100,
            ideal: 350,
        },
        locations: 2
    },
    {
        id: "4",
        name: "Atracurium",
        stock: 642,
        levels: {
            max: 700,
            min: 0,
            critical: 100,
            ideal: 350,
        },
        locations: 7
    },
    {
        id: "5",
        name: "Atropine",
        stock: 72,
        levels: {
            max: 250,
            min: 0,
            critical: 100,
            ideal: 350,
        },
        locations: 3
    },
    {
        id: "6",
        name: "Bupivacaine 0.25 %",
        stock: 68,
        levels: {
            max: 250,
            min: 0,
            critical: 100,
            ideal: 200
        },
        locations: 1
    },
];

function Inventory(props) {

    const {
        inventory,
        setInventory
    } = props;

    const pageTitle = "Inventory";
    const modal = useModal();
    const recordsPerPage = 10;

    // ##### States

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    // const [searchValue, setSearchValue] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});


    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    // ##### Lifecycle Methods

    useEffect(() => {
        if (!inventory.length) fetchInventory();
        setTotalPages(Math.ceil(inventory.length / recordsPerPage));
    }, []);

    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchInventory, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchValue]);

    // ##### Handler functions

    const onSearchChange = (input) => {
        setSearchValue(input)
    };

    const onItemPress = (item) => () => {
        modal.openModal('BottomSheetModal', {
            content: <InventoryBottomSheetContainer inventory={item}/>
        })
    };

    const onRefresh = () => {
        fetchInventory()
    };

    const onSelectAll = () => {
        const indeterminate = selectedIds.length >= 0 && selectedIds.length !== inventory.length;
        // console.log("Indeterminate: ", indeterminate)
        if (indeterminate) {
            const selectedAllIds = [...inventory.map(item => item.id)];
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

    const toggleActionButton = () => {
        setFloatingAction(!isFloatingActionDisabled);
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "INVENTORY ACTIONS"
            })
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

    // ##### Helper functions

    const getFabActions = () => {

        const deleteAction =
            <View style={{borderRadius: 6, flex: 1, overflow: 'hidden'}}>
                <LongPressWithFeedback pressTimer={1200} onLongPress={() => {
                }}>
                    <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {
                    }} touchable={false}/>
                </LongPressWithFeedback>
            </View>;


        const createAction = <ActionItem title={"Add Item"} icon={<AddIcon/>} onPress={
            openCreateInventoryModel
        }/>;

        return <ActionContainer
            floatingActions={[
                deleteAction,
                createAction
            ]}
            title={"STORAGE ACTIONS"}
        />
    };

    const openCreateInventoryModel = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {

            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreateInventoryDialogContainer
                            onCreated={(item) => onItemPress(item)()}
                            onCancel={() => setFloatingAction(false)}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    };

    const inventoryItemView = ({name, stock, locations, levels}, onActionPress, isCollapsed) => <>
        <View style={[styles.item, {justifyContent: 'space-between', flex: 2}]}>
            <Text style={{color: "#3182CE", fontSize: 16}}>
                {name}
            </Text>

            <View style={{
                width: 1,
                height: 24,
                backgroundColor: "#E3E8EF",
                marginLeft: 20
            }}/>
        </View>
        <View style={[styles.item, {justifyContent: "center"}]}>
            <Text style={[styles.itemText]}>
                {numberFormatter(stock)}
            </Text>
        </View>
        <View style={[styles.item, {justifyContent: "center"}]}>
            {/*   LEVELS    */}
            <LevelIndicator
                max={levels.max}
                min={0}
                level={stock}
                ideal={levels.ideal}
                critical={levels.critical}
            />
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <View style={styles.locationBox}>
                <Text style={[styles.itemText]}>
                    {locations}
                </Text>
            </View>
        </View>
        <View style={[styles.item, {justifyContent: "center"}]}>
            <IconButton
                Icon={isCollapsed ? <ActionIcon/> : <ActionCollapseIcon/>}
                onPress={onActionPress}
            />
        </View>
    </>;

    const storageItemView = ({locationName, stock, levels}, isChecked, onActionPress) => <View
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{alignSelf: 'center', justifyContent: 'center', padding: 10, marginRight: 10}}>
            <CheckBoxComponent
                isCheck={isChecked}
                onPress={onCheckBoxPress}
            />
        </View>
        <View style={[styles.item, {justifyContent: 'flex-start', flex: 2}]}>
            <SvgIcon iconName="doctorArrow" strokeColor="#718096"/>
            <Text style={{color: "#3182CE", fontSize: 16, marginLeft: 10}}>
                {locationName}
            </Text>
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText]}>
                {numberFormatter(stock)}
            </Text>
        </View>
        <View style={[styles.item, {justifyContent: "center"}]}>
            {/*   LEVELS    */}
            <LevelIndicator
                max={levels.max}
                min={0}
                level={stock}
                ideal={levels.ideal}
                critical={levels.critical}
            />
        </View>
        <View style={[
            styles.item, {justifyContent: "center"}
        ]}>
            <Text style={[styles.itemText]}>
                ...
            </Text>
        </View>
        <View style={[styles.item, {justifyContent: "center"}]}>
            <IconButton
                Icon={<TransferIcon/>}
                onPress={onActionPress}
            />
        </View>
    </View>;

    const renderItem = (item) => {

        const formattedItem = {
            name: item.name,
            stock: item.stock,
            locations: item.locations,
            levels: item.levels
        };

        return <CollapsibleListItem
            isChecked={selectedIds.includes(item.id)}
            onCheckBoxPress={onCheckBoxPress(item)}
            hasCheckBox={true}
            onItemPress={onItemPress(item)}
            render={(collapse, isCollapsed) => inventoryItemView(formattedItem, collapse, isCollapsed)}
        >
            <FlatList
                data={[
                    {
                        id: "1",
                        locationName: "OR1: Cabinet 6",
                        stock: 138,
                        levels: {
                            max: 400,
                            min: 0,
                            critical: 100,
                            ideal: 300,
                        },
                    },
                    {
                        id: "2",
                        locationName: "OR1: Cabinet 8",
                        stock: 22,
                        levels: {
                            max: 200,
                            min: 0,
                            critical: 50,
                            ideal: 100,
                        },
                        locations: 1
                    },
                ]}
                renderItem={({item}) => {
                    return storageItemView(item, false,() => {
                    })
                }}
                keyExtractor={(item, index)=> ""+index}
                ItemSeparatorComponent={() =>
                    <View style={{flex: 1, margin: 10, marginLeft: 10, borderColor: "#E3E8EF", borderWidth: .5}}/>
                }
            />

        </CollapsibleListItem>
    };

    const secondaryRender = () => {

        return <FlatList
            data={[
                {
                    id: "1",
                    locationName: "OR1: Cabinet 6",
                    stock: 138,
                    levels: {
                        max: 400,
                        min: 0,
                        critical: 100,
                        ideal: 300,
                    },
                },
                {
                    id: "2",
                    locationName: "OR1: Cabinet 8",
                    stock: 22,
                    levels: {
                        max: 200,
                        min: 0,
                        critical: 50,
                        ideal: 100,
                    },
                    locations: 1
                },
            ]}
            renderItem={({item}) => {
                return storageItemView(item, () => {
                })
            }}
            ItemSeparatorComponent={() =>
                <View style={{flex: 1, margin: 10, marginLeft: 10, borderColor: "#E3E8EF", borderWidth: .5}}/>
            }
        />
    };

    const fetchInventory = () => {
        setFetchingData(true);
        getInventories(searchValue)
            .then(data => {
                setInventory(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage));
            })
            .catch(error => {
                // todo handle error
                console.log("Failed to fetch inventory", error);
            })
            .finally(_ => {
                setFetchingData(false);
            })
    };

    let inventoryToDisplay = [...inventory];
    inventoryToDisplay = inventoryToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <View style={styles.container}>
            <Page
                placeholderText={"Search by heading or entry below."}
                routeName={pageTitle}
                listData={inventoryToDisplay}
                listItemFormat={renderItem}
                inputText={searchValue}
                itemsSelected={selectedIds}
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

Inventory.propTypes = {};
Inventory.defaultProps = {};


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
    locationBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 24,
        borderRadius: 4,
        shadowColor: "#000",
        backgroundColor: "#FFFFFF",
        shadowOffset: {
            width: .5,
            height: .5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        zIndex: 3,
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


const mapStateToProps = (state) => {
    const getLevels = (inventoryLocations = []) => {
        const levelsTotal = {
            max: 0,
            min: 0,
            critical: 0,
            ideal: 0,
        };
        inventoryLocations.forEach(location => {
            const {levels = {}} = location;

            levelsTotal.max+= levels.max || 0
            levelsTotal.min+= levels.min || 0
            levelsTotal.critical+= levels.critical || 0
            levelsTotal.ideal+= levels.ideal || 0
        });

        return levelsTotal;
    };
    const getTotalStock = (accumulator, currentValue) => {
        return accumulator + currentValue.stock
    };

    // REMAPPING INVENTORY ITEMS
    const inventory = state.inventory.map(item => {

        const {inventoryLocations = []} = item;
        const stock = inventoryLocations.reduce(getTotalStock, 0);
        const locations = inventoryLocations.length;
        const levels = getLevels(inventoryLocations);

        return {
            ...item,
            id: item._id,
            stock,
            locations,
            levels
        }
    });

    return {
        inventory
    }
};
const mapDispatchToProps = {
    setInventory
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
