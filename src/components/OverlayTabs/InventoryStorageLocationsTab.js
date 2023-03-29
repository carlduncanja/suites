import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import Table from '../common/Table/Table';
import moment from 'moment';
import LevelIndicator from '../common/LevelIndicator/LevelIndicator';
import Item from '../common/Table/Item';
import DataItem from '../common/List/DataItem';
import ContentDataItem from '../common/List/ContentDataItem';
import Footer from '../common/Page/Footer';
import TransferItemDialog from '../Inventory/TransferItemDialog';
import TransferIcon from '../../../assets/svg/transferIcon';
import AddIcon from '../../../assets/svg/addIcon';
import ActionItem from '../common/ActionItem';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import AddLocationDialog from '../Inventory/AddLocationDialog';
import { useModal } from 'react-native-modalfy';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { getInventoryVariantByGroup } from '../../api/network';
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';



const storageHeader = [
    {
        name: 'Location',
        alignment: 'flex-start',
        flex: 1.5
    },
    {
        name: 'In-Stock',
        alignment: 'center',
        flex: 1
    },
    {
        name: 'Capacity',
        alignment: 'center',
        flex: 1
    }
];

function InventoryStorageLocationsTab({ 
    selectedVariant = {},
    groupId = '',
    onUpdateItem
}) {

    const modal = useModal();
    const theme = useTheme();
    const  { storageLocations = [], _id = '', inventoryGroup = {} } = selectedVariant;

    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);


    const toggleActionButton = () => {
        setFloatingAction(true);

        modal.openModal('ActionContainerModal',
            {
                actions: floatingActions(),
                title: 'INVENTORY ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                },
            });
    };
 
    const handleTransferItems = () => {
        const { _id, name, inventoryGroup, storageLocations=[] } = selectedVariant;
        const groupId = inventoryGroup?._id;
        const selectedLocation = storageLocations.filter(location => location?._id === selectedItems[0])[0] || {};

        const variant = {
            _id,
            name,
            groupId,
        };

        const fromLocation = {
            location: selectedLocation?.location || '',
            levels: selectedLocation?.levels || {},
            locationName: selectedLocation?.locationName || '',
            stock: selectedLocation?.stock || 0
        };

        console.log('Variant: ', variant);
        console.log('Selected : ', fromLocation);

        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal(
                'OverlayModal',
                {
                    content: <TransferItemDialog
                        // onCreated={(item) => onItemPress(item)()}
                        variant={variant}
                        selectedLocation={fromLocation}
                        // groupId = {groupId}
                        onCreated={() => { setFloatingAction(false); onUpdateItem(); setSelectedItems([]); }}
                        onCancel={() => setFloatingAction(false)}
                    />,
                    onClose: () => setFloatingAction(false)
                }
            );
        }, 200);
    };

    const handleAddLocation = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <AddLocationDialog
                        onCreated={() => { setFloatingAction(false); onUpdateItem(); }}
                        onCancel={() => setFloatingAction(false)}
                        variant={selectedVariant}
                    />,
                    onClose: () => setFloatingAction(false)
                });
        }, 200);
    };

    const handleOnSelectAll = () => {
        let updatedLocationsList = selectAll(storageLocations, selectedItems);
        setSelectedItems(updatedLocationsList);
    };

    const handleOnCheckBoxPress = (item) => () => {
        // console.log("Item: ", item);
        const {_id} = item;
        let updatedItems = checkboxItemPress(_id, selectedItems);

        setSelectedItems(updatedItems);
    };

    // ####### HELPER FUNCTIONS

    const floatingActions = () => {
        let isDisabled = selectedItems.length === 1 ? false : true;

        const addLocation = (
            <ActionItem
                title="Add Location"
                icon={<AddIcon/>}
                onPress={() => handleAddLocation()}
            />
        );

        const itemTransfer = (
            <ActionItem
                title="Item Transfer"
                icon={<TransferIcon strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-orange-700']}/>}
                onPress={() => handleTransferItems()}
                disabled={isDisabled}
                touchable={!isDisabled}
            />
        );


        return <ActionContainer
            floatingActions={[
                addLocation,
                itemTransfer,
            ]}
            title="INVENTORY ACTIONS"
        />;
    };

    const storageItem = ({locationName, stock, levels}) => {
        let updatedLevels = {
            ...levels,
            min : 0
        };
        return <>

            <DataItem text={locationName} flex={1.5} color="--color-blue-600" fontStyle="--text-base-medium"/>
            <DataItem text={stock} flex={0.4} color="--color-gray-700" fontStyle="--text-base-medium" align="center"/> 
            
            <ContentDataItem
                align="center" 
                flex={0.7}
                content={(
                    <LevelIndicator
                        {...updatedLevels}
                        level={stock}
                    />
                )}
            />

            {/* <View style={[styles.item, {flex: 3,justifyContent: "flex-start"}]}>
                <Text style={[styles.itemText, styles.linkText]}>
                    {locationName}
                </Text>
            </View> */}
            {/* <View style={[styles.item, {justifyContent: "center"}]}>
                <Text style={styles.itemText}>
                    {stock}
                </Text>
            </View> */}

        </>;
    };

    const renderStorageLocation = (item) => {
        return <Item
            hasCheckBox={true}
            isChecked={selectedItems.includes(item._id)}
            itemView={storageItem(item)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
        />;
    };

    return (
        <>
            <Table
                data={storageLocations}
                listItemFormat={renderStorageLocation}
                headers={storageHeader}
                isCheckbox={true}
                itemSelected={selectedItems}
                toggleHeaderCheckbox={handleOnSelectAll}

            />
            <Footer
                hasPaginator={false}
                hasActionButton={true}
                hasActions={true}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
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
    linkText: {
        color: '#3182CE',
    },
    sectionHeading: {
        color: '#323843',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 24,
    },
    sectionContainer: {
        marginBottom: 40
    }
});

InventoryStorageLocationsTab.propTypes = {};
InventoryStorageLocationsTab.defaultProps = {};

export default InventoryStorageLocationsTab;
