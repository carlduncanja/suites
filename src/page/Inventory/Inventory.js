import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from "react-native";
 
import IconButton from "../../components/common/Buttons/IconButton";
import LevelIndicator from "../../components/common/LevelIndicator/LevelIndicator";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import CreateInventoryDialogContainer from "../../components/Inventory/CreateInventoryDialogContainer";
import CollapsibleListItem from "../../components/common/List/CollapsibleListItem";
import CreateInventoryGroupDialogContainer from '../../components/Inventory/CreateInventoryGroupDialogContainer';
import NavPage  from "../../components/common/Page/NavPage";
import Item from '../../components/common/Table/Item';
import DataItem from '../../components/common/List/DataItem';
import RightBorderDataItem from '../../components/common/List/RightBorderDataItem';
import ContentDataItem from '../../components/common/List/ContentDataItem';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import MultipleShadowsContainer from '../../components/common/MultipleShadowContainer';

import CollapsedIcon from "../../../assets/svg/closeArrow";
import ActionIcon from "../../../assets/svg/dropdownIcon";
import SvgIcon from "../../../assets/SvgIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";
import TransferIcon from "../../../assets/svg/transferIcon";
import AddIcon from "../../../assets/svg/addIcon";

import {numberFormatter} from "../../utils/formatter";
import {setInventory} from "../../redux/actions/InventorActions";
import {connect} from "react-redux";
import { getInventoriesGroup, removeInventoryGroup } from "../../api/network";
import {useModal} from "react-native-modalfy";
import {useNextPaginator, usePreviousPaginator, selectAll, checkboxItemPress} from "../../helpers/caseFilesHelpers";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import _ from "lodash";


const listHeaders = [
    {
        name: "Item Name",
        alignment: "flex-start",
        flex: 1.5,
        hasSort : true
    },
    {
        name: "In Stock",
        alignment: "center",
        flex:1,
        hasSort : true
    },
    {
        name: "Capacity",
        alignment: "center",
        flex:1,
    },
    {
        name: "Locations",
        alignment: "center",
        flex:1
    },
    {
        name : '',
        alignment: "center",
        flex:0.5
    }
];

const LocationsWrapper = styled.View`
    flex:1;
    align-items: center; 
    /* background-color:yellowgreen; */
`;

const LocationsContainer = styled.View`
    height : 24px;
    width : 28px;
    background-color : ${ ({theme, isCollapsed}) => isCollapsed === false ?  theme.colors['--color-gray-100']:theme.colors['--default-shade-white']};
    border-radius : 4px;
    align-items: center;
    justify-content: center;
`;

const LocationText = styled.Text( ({theme, isCollapsed})=> ({
    ...theme.font['--text-base-regular'],
    color :  isCollapsed === false ? theme.colors['--color-gray-500'] : theme.colors['--color-gray-700'],
}));

const ChildItemNameContainer = styled.View`
    width : 100%;
    background-color : yellow;
    flex-direction : row;
`;

const ChildItemName = styled.Text( ({theme}) => ({
    font : theme.font['--text-sm-medium'],
    color : theme.colors['--color-blue-500'],
}));


const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity : 0.06,
        shadowRadius : 2
    },
    {
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity  :0.1,
        shadowRadius : 3
    },
]

function Inventory(props) {

    const {
        inventory, 
        setInventory,
        route,
        navigation
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
    const [totalPages, setTotalPages] = useState(1);
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
        navigation.navigate("InventoryPage",{
            screen : "InventoryPage",
            initial: false,
            // params : {
                data: item,
                isGroup : true,
                isEdit: false
            // }
        });

    };

    const onItemVariantPress = (item, parentItem) => () =>{
        console.log("parent: ", parentItem)
        let updatedItem = {...item, name : item?.itemName, groupId : parentItem?._id , groupName : parentItem?.name}
        navigation.navigate("InventoryVariantPage",{
            screen : "InventoryVariantPage",
            initial: false,
            // params : {
                data: updatedItem,
                isEdit: false
            // }
        });
    }

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
                title: "INVENTORY ACTIONS",
                onClose : ()=> setFloatingAction(false)
            })

    };

    // ####### PARENT CHECKBOXPRESS

    const onCheckBoxPress = (item) => () => {
        const {_id, variants = [] } = item;
        let variantIds = []

        let updatedInventory = checkboxItemPress(item, _id, selectedIds);
        setSelectedIds(updatedInventory);

        if(selectedIds.includes(_id)){
            let removeChildren = selectedChildIds.filter( obj => obj.groupId !== _id)
            setSelectedChildIs(removeChildren)
            // console.log("Remove children: ", removeChildren)
        }else{
            variants.map( variant => variantIds.push(variant?._id));
            let updatedIds = [...selectedChildIds, { groupId : _id,variantIds}]
            setSelectedChildIs(updatedIds);
            // console.log("Included: ", updatedIds)
        }
    };

    // ####### CHILD CHECKBOXPRESS

    const onChildCheckBoxPress = (item, parentItem) => () => {
        const { _id } = item;
        let { variantIds = [] } = selectedChildIds.filter( obj => obj.groupId === parentItem?._id)[0] || {}
        let updatedChildIds = checkboxItemPress(item, _id, variantIds);

        if(variantIds.length === 0){

            let updatedParentIds = checkboxItemPress(parentItem, _id, selectedIds);
            let selectedChild = {groupId : parentItem?._id, variantIds : updatedChildIds}

            setSelectedChildIs([...selectedChildIds,selectedChild])
            setSelectedIds(updatedParentIds)

            // console.log("Included: ", [...selectedChildIds,selectedChild])
        }else{

            let updatedChildList = selectedChildIds.map( obj => obj.groupId === parentItem?._id ?
                { ...obj, variantIds : updatedChildIds}
                :
                obj
            )
            setSelectedChildIs(updatedChildList)

            // console.log("Updated item: ", updatedChildList)
        }

    };

    // ##### Helper functions

    const getFabActions = () => {
        let isDisabled = selectedIds.length === 0 ? true : false;
        const deleteAction =
            <View style={{borderRadius: 6, flex: 1, overflow: 'hidden'}}>
                <LongPressWithFeedback
                    pressTimer={1200}
                    onLongPress={removeGroup}
                    isDisabled = {isDisabled}
                >
                    <ActionItem
                        title={"Hold to Delete"}
                        icon={<WasteIcon strokeColor = {isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}/>}
                        onPress={() => {}}
                        disabled = {isDisabled}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>;


        const createAction = <ActionItem title={"Add Item"} icon={<AddIcon/>} onPress={openCreateInventoryModel}/>;
        const createGroup = <ActionItem title={"Create Item Group"} icon={<AddIcon/>} onPress={openCreateGroupDialog}/>;
        const itemTranfer = 
            <ActionItem
                title={"Item Transfer"}
                icon={<TransferIcon strokeColor = {isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-orange-700']}/>}
                onPress={() => {}}
                disabled = {isDisabled}
                touchable={!isDisabled}
            />

        return <ActionContainer
            floatingActions={[
                deleteAction,
                createAction,
                createGroup,
                itemTranfer
            ]}
            title={"INVENTORY ACTIONS"}
        />
    };

    const removeGroup = () => {
        // Done with one id selected
        if (selectedIds.length == 1){
            let idToDelete = selectedIds[0] || "";
            openConfirmationScreen(idToDelete);
        }else{
            openErrorConfirmation();
        }
    }

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
            {
                isCollapsed ?
                    <DataItem text = {name} flex = {1.5} color="--color-gray-800" fontStyle = "--text-base-regular"/>
                    :
                    <RightBorderDataItem text = {name} flex = {1.5} color="--color-gray-800" fontStyle = "--text-base-regular"/>

            }
            <DataItem text = {numberFormatter(stock)} color="--color-gray-700" fontStyle = "--text-base-regular" align="center"/>
            <ContentDataItem
                align = "center"
                content = {
                    <LevelIndicator
                    max={levels.max}
                    min={0}
                    level={stock}
                    ideal={levels.ideal}
                    critical={levels.critical}
                />
                }
            />
            <LocationsWrapper>
                <MultipleShadowsContainer shadows = {shadows}>
                    <LocationsContainer theme = {theme} isCollapsed = {isCollapsed}>
                            <LocationText theme = {theme} isCollapsed = {isCollapsed}>{locations}</LocationText>
                        </LocationsContainer>
                </MultipleShadowsContainer>
            </LocationsWrapper>

            <ContentDataItem
                align = "center"
                flex = {0.5}
                content = {
                    <IconButton
                    Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
                    onPress={onActionPress}
                />
                }
            />

    </>;

    const storageItemView = ({itemName, stock, levels, locations}, onActionPress) =>
    <>

        <RightBorderDataItem text = {itemName} flex = {1.5} color="--color-blue-600" fontStyle = "--text-sm-medium"/>
        <DataItem text = {numberFormatter(stock)} color="--color-gray-700" fontStyle = "--text-base-regular" align="center"/>
        <ContentDataItem
            flex = {1}
            align = "center"
            content = {
                <LevelIndicator
                    max={levels.max}
                    min={0}
                    level={stock}
                    ideal={levels.ideal}
                    critical={levels.critical}
                />
            }
        />

        <DataItem text = {locations} color="--color-blue-600" fontStyle = "--text-base-regular" align="center"/>
        <DataItem flex = {0.4}/>
    </>;

    const renderChildItemView = (item, parentItem, onActionPress) => {
        let { _id } = item
        let { variantIds = [] } = selectedChildIds.filter( obj => obj.groupId === parentItem?._id)[0] || {}

        return (
            <Item
                itemView = {storageItemView(item, onActionPress)}
                hasCheckBox = {true}
                isChecked = {variantIds.includes(_id)}
                onCheckBoxPress = {onChildCheckBoxPress(item, parentItem)}
                onItemPress = {onItemVariantPress(item, parentItem)}
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
                nestedScrollEnabled={true}
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

    const openConfirmationScreen = (id) => { 
        modal
            .openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError = {false}
                        isEditUpdate = {true}
                        onCancel = {()=> modal.closeModals('ConfirmationModal')}
                        onAction = {()=>{
                            modal.closeModals('ConfirmationModal');
                            removeGroupCall(id)}
                        }
                        // onAction = { () => confirmAction()}
                        message = {"Do you want to delete these item(s)?"}
                    />
                    ,
                    onClose: () => {modal.closeModals('ConfirmationModal')}
                })
    }

    const openErrorConfirmation = () =>{
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError = {true}
                    isEditUpdate = {false}
                    onCancel = {()=> modal.closeModals('ConfirmationModal')}
                />
                ,
                onClose: () => {modal.closeModals('ConfirmationModal')}
            })
    }


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
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages)

            })
            .catch(error => {
                // todo handle error
                console.log("Failed to fetch inventory", error);
                setTotalPages(1)
                setPreviousDisabled(true)
                setNextDisabled(true)
            })
            .finally(_ => {
                setFetchingData(false);
            })
    };

    const removeGroupCall = (id) => {
        removeInventoryGroup(id)
            .then(_ => {
                // setTimeout(()=>{
                //     modal.closeModals('ConfirmationModal');

                // },200);
                // modal.closeModals("ActionContainerModal");
                // onRefresh();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError = {false}
                            isEditUpdate = {false}
                            onAction = {()=> {
                                modal.closeModals('ConfirmationModal');
                                setTimeout(()=>{
                                    modal.closeModals("ActionContainerModal");
                                    onRefresh();
                                },200);
                            }}
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })

                setSelectedIds([]);

            })
            .catch( error => {
                openErrorConfirmation();
                setTimeout(()=>{
                    modal.closeModals("ActionContainerModal");
                },200);
                console.log("Failed to remove group: ", error);
            })
            .finally (_ =>{
                setFloatingAction(false);
            })
    }

    const confirmAction = () =>{
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError = {false}
                    isEditUpdate = {false}
                    onAction = {()=> {
                        modal.closeModals('ConfirmationModal');
                        setTimeout(()=>{
                            modal.closeModals("ActionContainerModal");
                            onRefresh();

                        },200);
                    }}
                />
                ,
                onClose: () => {modal.closeModals('ConfirmationModal')}
            })
    }

    let inventoryToDisplay = [...inventory];

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
