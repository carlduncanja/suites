import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, FlatList, ScrollView} from "react-native";
import Page from "../components/common/Page/Page";
import IconButton from "../components/common/Buttons/IconButton";
// import ActionIcon from "../../assets/svg/ActionIcon";
import CollapsedIcon from "../../assets/svg/closeArrow";
import ActionIcon from "../../assets/svg/dropdownIcon";
import ListItem from "../components/common/List/ListItem";
import LevelIndicator from "../components/common/LevelIndicator/LevelIndicator";
import {numberFormatter} from "../utils/formatter";
import _ from "lodash";

import {setInventory} from "../redux/actions/InventorActions";
import {connect} from "react-redux";
import {getInventoriesGroup} from "../api/network";
import {useModal} from "react-native-modalfy";
import InventoryBottomSheetContainer from "../components/Inventory/InventoryBottomSheetContainer";
import RoundedPaginator from "../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../components/common/FloatingAction/FloatingActionButton";
import {useNextPaginator, usePreviousPaginator, selectAll, checkboxItemPress} from "../helpers/caseFilesHelpers";
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
import CreateInventoryGroupDialogContainer from '../components/Inventory/CreateInventoryGroupDialogContainer';
import NavPage  from "../components/common/Page/NavPage";
import Item from '../components/common/Table/Item';
import DataItem from '../components/common/List/DataItem';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming'; 


const listHeaders = [
    {
        name: "Item Name",
        alignment: "flex-start",
        flex: 1.5
    },
    {
        name: "In Stock",
        alignment: "center"
    },
    {
        name: "Capacity",
        alignment: "center"
    },
    {
        name: "Locations",
        alignment: "center"
    },
    {
        name : '',
        alignment: "center"
    }
];

const LocationsWrapper = styled.View`
    flex:1;
    align-items: center; 
`;

const LocationsContainer = styled.View`
    height : 24px;
    width : 28px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
    border-radius : 4px;
    box-shadow : ${ ({theme}) => theme.shadow['--shadow-lg']};
    align-items: center;
    justify-content: center;
`;

const LocationText = styled.Text( ({theme})=> ({
    ...theme.font['--text-base-regular'],
    color : theme.colors['--color-gray-700'],
}));


function Inventory(props) {

    const {
        inventory,
        setInventory
    } = props;

    const pageTitle = "Inventory";
    const modal = useModal();
    const theme = useTheme();
    const recordsPerPage = 10;

    // ##### States

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedChildIds, setSelectedChildIs] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});


    // pagination
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    // ##### Lifecycle Methods

    useEffect(() => {
        if (!inventory.length) fetchInventory(currentPagePosition);
        setTotalPages(Math.ceil(inventory.length / recordsPerPage));
    }, []);

    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchInventory(1)
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchInventory, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
        setCurrentPagePosition(1)
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
        let updatedInventory = selectAll(inventory, selectedIds)
        setSelectedIds(updatedInventory)
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchInventory(currentPage)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchInventory(currentPage)
    };

    const toggleActionButton = () => {
        setFloatingAction(!isFloatingActionDisabled);
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "INVENTORY ACTIONS"
            })
    };

    // ####### PARENT CHECKBOXPRESS

    const onCheckBoxPress = (item) => () => {
        const {_id, variants = [] } = item;
        let variantIds = []

        let updatedInventory = checkboxItemPress(item, _id, selectedIds);
        setSelectedIds(updatedInventory);

        if(updatedInventory.length !== 0){
            variants.map( variant => variantIds.push(variant?._id));
            setSelectedChildIs(variantIds);
        }else{
            setSelectedChildIs([])
        }
    };

    // ####### CHILD CHECKBOXPRESS

    const onChildCheckBoxPress = (item, parentItem) => () => {
        const { _id } = item;

        let updatedChildIds = checkboxItemPress(item, _id, selectedChildIds);
        let updatedParentIds = checkboxItemPress(parentItem, _id, selectedIds);
        setSelectedChildIs(updatedChildIds)
        setSelectedIds(updatedParentIds)

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


        const createAction = <ActionItem title={"Add Item"} icon={<AddIcon/>} onPress={openCreateInventoryModel}/>;
        const createGroup = <ActionItem title={"Create Item Group"} icon={<AddIcon/>} onPress={openCreateGroupDialog}/>;

        return <ActionContainer
            floatingActions={[
                deleteAction,
                createAction,
                createGroup
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
                            // onCreated={(item) => onItemPress(item)()}
                            onCreated = {()=>{setFloatingAction(false)}}
                            onCancel={() => setFloatingAction(false)}
                        />,
                        onClose: () => setFloatingAction(false)
                    })
        }, 200)
    };

    const openCreateGroupDialog = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <CreateInventoryGroupDialogContainer
                        onCreated={()=>{onRefresh(); setFloatingAction(false)}}
                        onCancel={() => setFloatingAction(false)}
                    />,
                    onClose: () => setFloatingAction(false)
                })
        }, 200)
    };
   
    const getLevels = (locations = []) => {
        const levelsTotal = {
            max: 0,
            min: 0,
            critical: 0,
            ideal: 0,
        };

        locations.forEach(location => {
            const { levels = {} } = location

            levelsTotal.max += levels.max || 0
            levelsTotal.min += levels.min || 0
            levelsTotal.critical += levels.critical || 0
            levelsTotal.ideal += levels.ideal || 0
            
        });

        return levelsTotal;
    };
    
    const getStock = (locations) => {
        return locations.reduce((acc, curr)=>{ return acc + curr.stock }, 0)
    }

    const inventoryItemView = ({name, stock, locations, levels}, onActionPress, isCollapsed) => 
        <>

            <DataItem text = {name} flex = {1.5} color="--color-gray-800" fontStyle = "--text-base-regular"/>
            <DataItem text = {numberFormatter(stock)} color="--color-gray-700" fontStyle = "--text-base-regular" align="center"/>
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

            <LocationsWrapper>
                <LocationsContainer theme = {theme}>
                    <LocationText theme = {theme}>{locations}</LocationText>
                </LocationsContainer>
            </LocationsWrapper>

            {/* <View style={[styles.item, {justifyContent: 'space-between', flex: 2, ...styles.rowBorderRight}]}>
                <Text style={{color: "#3182CE", fontSize: 16}}>
                    {name}
                </Text>
            </View> */}

            {/* <View style={[styles.item, {justifyContent: "center"}]}>
                <Text style={[styles.itemText]}>
                    {numberFormatter(stock)}
                </Text>
            </View> */}

            {/* <View style={[
                styles.item, {justifyContent: "center"}
            ]}>
                <View style={styles.locationBox}>
                    <Text style={[styles.itemText]}>
                        {locations}
                    </Text>
                </View>
            </View> */}

            <View style={[styles.item, {justifyContent: "center"}]}>
                <IconButton
                    Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
                    onPress={onActionPress}
                />  
            </View>
    </>;

    const storageItemView = ({itemName, stock, levels, locations}, onActionPress) => <View
        style={{flexDirection: 'row', alignItems: 'center'}}>

        <View style={[styles.item, {justifyContent: 'flex-start', flex: 1.5}]}>
            <SvgIcon iconName="doctorArrow" strokeColor="#718096"/>
            <Text style={{color: "#3182CE", fontSize: 16, marginLeft: 10}}>
                {itemName}
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
                {locations}
            </Text>
        </View>
        
        <View style={[styles.item, {justifyContent: "center"}]}>
            {/* <IconButton
                Icon={<TransferIcon/>}
                onPress={onActionPress}
            /> */}
        </View>
    </View>;

    const renderChildItemView = (item, parentItem, onActionPress) => {
        let { _id } = item
        return (
            <Item
                itemView = {storageItemView(item, onActionPress)}
                hasCheckBox = {true}
                isChecked = {selectedChildIds.includes(_id)}
                onCheckBoxPress = {onChildCheckBoxPress(item, parentItem)}
                onItemPress = {()=>{}}
            />
        )
    };

    const renderItem = (item) => {

        const formattedItem = {
            _id : item?._id,
            name: item?.name || "",
            stock: item?.stock || 0,
            locations: item?.locations || 0,
            levels: item?.levels
        };

        let {variants = []} = item;
        
        variants = variants.map( item => {
            let { storageLocations = [] } = item
            let levels = getLevels(storageLocations);
            let stock = getStock(storageLocations) || 0;

            return (
                {
                    _id: item?._id,
                    itemName: item?.name || "",
                    stock: stock,
                    locations : storageLocations.length,
                    levels: levels || {}
                }
            )
        })
     
        return <CollapsibleListItem
            isChecked={selectedIds.includes(item._id)}
            onCheckBoxPress={onCheckBoxPress(item)}
            hasCheckBox={true}
            onItemPress={onItemPress(item)}
            render={(collapse, isCollapsed) => inventoryItemView(formattedItem, collapse, isCollapsed)}
        >
            <FlatList
                data={variants}
                renderItem={({item}) => {
                    return renderChildItemView(item, formattedItem, () => {
                    })
                }}
                keyExtractor={(item, index) => "" + index}
                ItemSeparatorComponent={() =>
                    <View style={{flex: 1, margin: 10, marginLeft: 10, borderColor: "#E3E8EF", borderWidth: .5}}/>
                }
            />

        </CollapsibleListItem>
    };

    const fetchInventory = (pagePosition) => {

       let currentPosition = pagePosition ? pagePosition  : 1;
       setCurrentPagePosition(currentPosition)

        setFetchingData(true);
        getInventoriesGroup(searchValue, recordsPerPage, currentPosition)
            .then(inventoryResult => {
                const { data = [], pages = 0 } = inventoryResult
                
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
               
                setInventory(data);
                data.length === 0 ? setTotalPages(0) : setTotalPages(pages)
                
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
    // inventoryToDisplay = inventoryToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <NavPage
            placeholderText={"Search by item name."}
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
    rowBorderRight: {
        borderRightColor: "#E3E8EF",
        borderRightWidth: 1,
    
        // marginRight: 20,
        // flex: 2
      },
});


const mapStateToProps = (state) => {

    const getLevels = (variants = []) => {

        const levelsTotal = {
            max: 0,
            min: 0,
            critical: 0,
            ideal: 0,
        };

        variants.forEach(variant => {
            const { storageLocations = [] } = variant
            storageLocations.map( location => {
                const { levels = {} } = location

                levelsTotal.max += levels.max || 0
                levelsTotal.min += levels.min || 0
                levelsTotal.critical += levels.critical || 0
                levelsTotal.ideal += levels.ideal || 0
            })
        });

        return levelsTotal;
    };

    // const getTotalStock = (accumulator, currentValue) => {
    //     return accumulator + currentValue.stock
    // };

    const getLocations = (variant) => {
        let count = 0
        variant.map( item => {count += item?.storageLocations?.length })
        return count
    }

    const getStock = (variant) => {
        let count = 0
        variant.map( item => {
            count += item.storageLocations.reduce((acc, curr)=>{ return acc + curr.stock }, 0)
        })
        return count
    }

    // REMAPPING INVENTORY ITEMS
    const inventory = state.inventory.map(item => {

        const { variants = [] } = item;

        const stock = getStock(variants);
        const locations = getLocations(variants)
        const levels = getLevels(variants);

        return {
            ...item,
            // id: item._id,
            stock,
            locations,
            levels
            // storageLocations: inventoryLocations
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
