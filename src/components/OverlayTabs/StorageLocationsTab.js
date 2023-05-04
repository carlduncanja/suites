import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import moment from 'moment';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Table from '../common/Table/Table';
import LevelIndicator from '../common/LevelIndicator/LevelIndicator';
import Item from '../common/Table/Item';
import CollapsibleListItem from '../common/List/CollapsibleListItem';
import DataItem from '../common/List/DataItem';
import RightBorderDataItem from '../common/List/RightBorderDataItem';
import ContentDataItem from '../common/List/ContentDataItem';
import MultipleShadowsContainer from '../common/MultipleShadowContainer';
import IconButton from '../common/Buttons/IconButton';
import ActionIcon from '../../../assets/svg/dropdownIcon';
import CollapsedIcon from '../../../assets/svg/closeArrow';
import {checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import Footer from '../common/Page/Footer';

const StockWrapper = styled.View`
    flex: 1;
    align-items: center;
`;

const StockContainer = styled.View`
    height : 24px;
    width : 28px;
    background-color : ${({theme, isCollapsed}) => (isCollapsed === false ? theme.colors['--color-gray-100'] : theme.colors['--default-shade-white'])};
    border-radius : 4px;
    align-items: center;
    justify-content: center;
`;

const StockText = styled.Text(({theme, isCollapsed}) => ({
    ...theme.font['--text-base-regular'],
    color: isCollapsed === false ? theme.colors['--color-gray-500'] : theme.colors['--color-gray-700'],
}));

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 0
        },
        shadowOpacity: 0.06,
        shadowRadius: 2
    },
    {
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
];

const headers = [
    {
        name: 'Location',
        alignment: 'flex-start',
        flex: 2,
    },
    {
        name: 'Levels',
        alignment: 'center',
        flex: 1,
    },
    {
        name: 'Products',
        alignment: 'center',
        flex: 1,
    },
    {
        name: '',
        alignment: 'center',
        flex: 0.4,
    }
];

function StorageLocationsTab({storageLocations = []}) {
    const theme = useTheme();

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedInventories, setSelectedInventories] = useState([]);

    const [expandedItems, setExpandedItems] = useState([]);

    const onCheckBoxPress = item => () => {
        const {_id, inventoryLocations = []} = item;

        const updatedStorageLocations = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedStorageLocations);

        const removeChildren = selectedInventories.filter(obj => obj.storageLocationId !== _id);
        setSelectedInventories(removeChildren);
    };

    const onChildCheckBoxPress = (inventoryItem, storageLocation) => () => {
        const {_id} = inventoryItem;
        const {_id: storageLocationId} = storageLocation;

        // get ids for inventory items
        const inventoryIds = selectedInventories.map(equipment => equipment._id);
        const updatedChildIds = checkboxItemPress(_id, inventoryIds);

        // set selected location
        const updatedSelectedInventories = updatedChildIds.map(_id => ({
            _id,
            storageLocationId
        }));
        setSelectedInventories(updatedSelectedInventories);

        // unselect group when child is selected
        const updatedIds = selectedIds.filter(id => id !== storageLocationId);
        setSelectedIds(updatedIds);
    };

    const onCollapseView = key => {
        if (expandedItems.includes(key)) setExpandedItems(expandedItems.filter(item => item !== key));
        else setExpandedItems([...expandedItems, key]);
    };

    const storageItemView = ({locationName, stock, levels}, onActionPress, isCollapsed) => (
        <>
            {/* {
                isCollapsed ? (
                    <DataItem
                        text={locationName}
                        flex={2}
                        color="--color-gray-800"
                        fontStyle="--text-base-regular"
                    />
                ) : (
                    <RightBorderDataItem
                        text={locationName}
                        flex={2}
                        color="--color-gray-800"
                        fontStyle="--text-base-regular"
                    />
                )} */}
            <RightBorderDataItem
                text={locationName}
                flex={2}
                color="--color-gray-800"
                fontStyle="--text-base-regular"
            />

            <ContentDataItem
                align="center"
                flex={1}
                content={(
                    <LevelIndicator
                        max={levels.max}
                        min={levels.min}
                        ideal={levels.ideal}
                        critical={levels.critical}
                        level={stock}
                    />
                )}
            />

            <StockWrapper flex={1}>
                <MultipleShadowsContainer shadows={shadows}>
                    <StockContainer theme={theme} isCollapsed={isCollapsed}>
                        <StockText theme={theme} isCollapsed={isCollapsed}>{stock}</StockText>
                    </StockContainer>
                </MultipleShadowsContainer>
            </StockWrapper>

            <ContentDataItem
                align="center"
                flex={0.4}
                content={(
                    <IconButton
                        Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
                        onPress={onActionPress}
                    />
                )}
            />
        </>
    );

    const inventoryItemView = ({inventoryName, stock, levels}, onActionPress) => (
        <>
            <RightBorderDataItem
                text={inventoryName}
                flex={2}
                color="--color-blue-600"
                fontStyle="--text-base-medium"
            />

            <ContentDataItem
                align="center"
                content={(
                    <LevelIndicator
                        max={levels.max}
                        min={levels.min}
                        ideal={levels.ideal}
                        critical={levels.critical}
                        level={stock}
                    />
                )}
            />
            <DataItem flex={0.4}/>

            <DataItem flex={1} text={stock} color="--color-blue-600" fontStyle="--text-base-medium" align="center"/>
        </>
    );

    const renderChildItemView = (item, parentItem, onActionPress) => {
        const {_id} = item;
        const inventoryIds = selectedInventories.map(obj => obj._id);

        return (
            <Item
                itemView={inventoryItemView(item, onActionPress)}
                hasCheckBox={true}
                isChecked={inventoryIds.includes(_id)}
                onCheckBoxPress={onChildCheckBoxPress(item, parentItem)}
                onItemPress={() => {
                }}
            />
        );
    };

    const renderListFn = item => {
        const {_id, inventoryLocations} = item;

        const isIndeterminate = selectedInventories.some(inventory => inventory.storageLocationId === _id);

        return <CollapsibleListItem
            hasCheckBox={true}
            isChecked={selectedIds.includes(_id)}
            isIndeterminate={isIndeterminate}
            onCheckBoxPress={onCheckBoxPress(item)}
            onItemPress={() => console.info('Storage Location Selected:', item)}
            collapsed={!expandedItems.includes(_id)}
            onCollapsedEnd={() => onCollapseView(_id)}
            render={(collapse, isCollapsed) => storageItemView(item, collapse, isCollapsed)}
        >
            <FlatList
                data={inventoryLocations}
                // nestedScrollEnabled={true}
                renderItem={({item: childItem}) => renderChildItemView(childItem, item, () => {
                })}
                keyExtractor={(item, index) => `${index}`}
                ItemSeparatorComponent={() => (
                    <View style={{
                        flex: 1,
                        margin: 10,
                        marginLeft: 10,
                        borderColor: '#E3E8EF',
                        borderWidth: 0.5
                    }}
                    />
                )}
            />
        </CollapsibleListItem>;
    };

    const toggleHeaderCheckbox = () => {
        const updatedStorageLocations = selectAll(storageLocations, selectedIds);
        setSelectedIds(updatedStorageLocations);
    };

    return (
        <>
            <Table
                data={storageLocations}
                listItemFormat={renderListFn}
                headers={headers}
                isCheckbox={true}
                itemSelected={selectedIds}
                toggleHeaderCheckbox={toggleHeaderCheckbox}
            />

            <Footer
                hasActions={false}
                hasPaginator={false}
            />

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 32
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 22
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 16,
        color: '#4E5664',
    },
    linkText: {color: '#3182CE'},
    sectionHeading: {
        color: '#323843',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 24,
    },
    sectionContainer: {marginBottom: 40},
    rowBorderRight: {
        borderRightColor: '#E3E8EF',
        borderRightWidth: 1,
        // marginRight: 20,
    },
});

StorageLocationsTab.propTypes = {};
StorageLocationsTab.defaultProps = {};

export default StorageLocationsTab;
