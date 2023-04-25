import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useModal} from 'react-native-modalfy';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import _ from 'lodash';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import AddIcon from '../../../assets/svg/addNewIcon';
import Table from '../common/Table/Table';
import Paginator from '../common/Paginators/Paginator';
import Button from '../common/Buttons/Button';
import Item from '../common/Table/Item';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';
import ClearList from '../../../assets/svg/clearList';
import DeleteIcon from '../../../assets/svg/wasteIcon';
import NumberChangeField from '../common/Input Fields/NumberChangeField';
import IconButton from '../common/Buttons/IconButton';
import ContentDataItem from '../common/List/ContentDataItem';
import ConfirmationComponent from '../ConfirmationComponent';
import {currencyFormatter} from '../../utils/formatter';

import {getTheatres, getInventories, getEquipmentTypes} from '../../api/network';
import {useNextPaginator, usePreviousPaginator} from '../../helpers/caseFilesHelpers';
import DataItem from '../common/List/DataItem';
// import SearchableMultipleOptionField from "../common/InputFields/SearchableMultipleOptionField";

const ContentWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  position: relative;
`;

const SearchableFieldContainer = styled.View`
  margin-bottom: ${({theme}) => theme.space['--space-32']};
`;

const TableContainer = styled.View`
  margin-top: ${({theme}) => theme.space['--space-32']};
  height: 260px;
  z-index: -1;
`;

const ItemWrapper = styled.View`
  flex-direction: row;
  height: 20px;
  margin-bottom: ${({theme}) => theme.space['--space-24']};
  margin-right: ${({theme}) => theme.space['--space-24']};
`;

const FooterWrapper = styled.View`
  position: absolute;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  height: 32px;
`;

const PaginatorContainer = styled.View`
  height: 100%;
  width: 122px;
  border: 1px solid ${({theme}) => theme.colors['--color-gray-400']};
  border-radius: 4px;
`;

const ClearListContainer = styled.TouchableOpacity`
  height: 100%;
  flex-direction: row;
  width: 80px;
  align-items: center;
  justify-content: space-between;
`;

const ClearListText = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-regular'],
    color: theme.colors['--color-blue-600'],
}));

function DialogItems({
    handleData,
    itemData = [],
    headers = [],
    itemType = ''
}) {
    const recordsPerPage = 4;
    const theme = useTheme();
    const modal = useModal();

    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // const [searchConsumableValue, setSearchConsumableValue] = useState("")
    // const [searchConsumableResults, setSearchConsumableResults] = useState([]);
    // const [searchConsumableQuery, setSearchConsumableQuery] = useState({});

    // const [searchEquipmentValue, setSearchEquipmentValue] = useState("")
    // const [searchEquipmentResults, setSearchEquipmentResults] = useState([]);
    // const [searchEquipmentQuery, setSearchEquipmentQuery] = useState({});

    const [selectedItem, setSelectedItem] = useState(false);

    const totalPages = itemData.length === 0 ? 1 : Math.ceil(itemData.length / recordsPerPage);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const fetchFunction = itemType === 'Locations' ? fetchTheatres : itemType === 'Consumables' ? fetchConsumables : fetchEquipments;
        const search = _.debounce(fetchFunction, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [searchValue]);

    const fetchTheatres = () => {
        getTheatres(searchValue, 5)
            .then((theatresResult = {}) => {
                const {data = [], pages = 0} = theatresResult;

                const results = data.map(item => ({
                    // name: `Dr. ${item.surname}`,
                    ...item
                }));
                // console.log("Data: ", results);
                setSearchResults(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get theatres');
                setSearchValue([]);
            });
    };

    const fetchConsumables = () => {
        getInventories(searchValue, 5)
            .then((consumablesResult = {}) => {
                const {data = [], pages = 0} = consumablesResult;

                const results = data.map(item => ({
                    // name: `Dr. ${item.surname}`,
                    ...item
                }));
                // console.log("Data: ", results);
                setSearchResults(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get theatres');
                setSearchValue([]);
            });
    };

    const fetchEquipments = () => {
        getEquipmentTypes(searchValue, 5)
            .then((equipmentResult = {}) => {
                const {data = [], pages = 0} = equipmentResult;
                console.log('Results:', data);
                const results = data.map(item => ({
                    // name: `Dr. ${item.surname}`,
                    ...item
                }));
                // console.log("Data: ", results);
                setSearchResults(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get equipments');
                setSearchValue([]);
            });
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition > 1) {
            const {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const onItemSelected = item => {
        const isItemInList = itemData.some(object => object._id === item._id);

        // prevents duplicates from being added to list
        if (isItemInList) return;

        let updatedData = [...itemData];
        const updatedItem = {
            ...item,
            amount: 1
        };
        setSelectedItem(updatedItem);

        updatedData.includes(updatedItem) ? updatedData = updatedData : updatedData = [...updatedData, updatedItem];
        handleData(updatedData);

        console.info('New List:', updatedData);
    };

    const onClearItem = () => {
        setSearchValue('');
        setSelectedItem(false);
    };

    const onClearPress = () => {
        setSearchValue('');
        handleData([]);
        setCurrentPagePosition(1);
    };

    const onQuantityChange = item => action => {
        const {amount = 1} = item;

        const updatedObj = {
            ...item,
            amount: action === 'add' ? amount + 1 : amount === 1 ? amount : amount - 1
        };

        const updatedData = itemData.map(item => (item._id === updatedObj._id ?
            {...updatedObj} :
            {...item}));

        handleData(updatedData);
        // setItems(updatedData)
    };

    const onAmountChange = item => value => {
        const updatedObj = {
            ...item,
            amount: value === '' ? '' : parseFloat(value) < 1 ? 1 : parseInt(value)
        };

        const updatedData = itemData.map(item => (item._id === updatedObj._id ?
            {...updatedObj} :
            {...item}));

        handleData(updatedData);
        // setItems(updatedData)
    };

    const handleDeleteItem = item => {
        modal
            .openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={true}
                        onCancel={() => modal.closeModals('ConfirmationModal')}
                        onAction={() => {
                            onDeletePress(item);
                            setTimeout(() => {
                                modal.closeModals('ConfirmationModal');
                            }, 100);
                        }}
                        // onAction = { () => confirmAction()}
                        message="Do you want to delete this item ?"
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                }
            );
    };

    const onDeletePress = item => {
        const filterItems = itemData.filter(obj => obj._id !== item._id);
        handleData(filterItems);
        // setItems(filterItems)
    };

    const listLocationsItem = item => {
        const recovery = item.hasRecovery ? 'Yes' : 'No';
        const recoveryColor = item.hasRecovery ? '--color-green-600' : '--color-red-600';

        return (
            <ItemWrapper theme={theme}>
                <DataItem
                    text={item?.name}
                    color="--color-blue-600"
                    fontStyle="--text-base-medium"
                />

                <DataItem
                    text={recovery}
                    align="flex-end"
                    color={recoveryColor}
                    fontStyle="--text-sm-medium"
                    // flex = {0.2}
                />
            </ItemWrapper>
        );
    };

    const listConsumblesEquipmentItem = item => {
        const {name = '', unitCost = 0, unitPrice = 0, amount = 1} = item;
        const price = itemType === 'Consumables' ? unitCost : unitPrice;
        // console.log('Item: ', item);
        return (
            <ItemWrapper theme={theme} style={css`margin-right: 0;`}>
                <DataItem text={name} flex={0.9} fontStyle="--text-base-medium" color="--color-blue-600"/>
                <NumberChangeField
                    onChangePress={onQuantityChange(item)}
                    onAmountChange={onAmountChange(item)}
                    value={amount.toString()}
                    flex={1.8}
                />
                <DataItem text={`$ ${currencyFormatter(price)}`} flex={1} align="center" fontStyle="--text-sm-regular" color="--color-gray-800"/>
                <ContentDataItem
                    align="flex-end"
                    content={(
                        <IconButton
                            Icon={<DeleteIcon/>}
                            onPress={() => handleDeleteItem(item)}
                        />
                    )}
                />
            </ItemWrapper>
        );
    };

    // let dataToDisplay = handleDisplayData()
    let dataToDisplay = [...itemData];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <ContentWrapper>

            <SearchableFieldContainer theme={theme}>
                <SearchableOptionsField
                    value={selectedItem}
                    text={searchValue}
                    shouldShowValue={false}
                    oneOptionsSelected={item => {
                        onItemSelected(item);
                        onClearItem();
                    }}
                    onChangeText={value => setSearchValue(value)}
                    onClear={() => onClearItem()}
                    options={searchResults}
                    placeholder={itemType === 'Locations' ? 'Add New Location' : 'Item Name'}
                    handlePopovers={() => {
                        // console.log("handle popovers");
                    }}
                    isPopoverOpen={searchQuery}
                    // borderColor = {theme.colors['--color-gray-400']}
                />
            </SearchableFieldContainer>

            <TableContainer theme={theme}>
                <Table
                    data={dataToDisplay}
                    currentListMin={currentPageListMin}
                    currentListMax={currentPageListMax}
                     listItemFormat={itemType === 'Locations' ? listLocationsItem : listConsumblesEquipmentItem}
                    headers={headers}
                    isCheckbox={false}
                />
            </TableContainer>

            <FooterWrapper>
                <PaginatorContainer theme={theme}>
                    <Paginator
                        currentPage={currentPagePosition}
                        totalPages={totalPages}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                         hasNumberBorder={false}
                    />
                </PaginatorContainer>

                <ClearListContainer onPress={onClearPress}>
                    <ClearListText theme={theme}>Clear List</ClearListText>
                    <ClearList strokeColor={theme.colors['--color-blue-600']}/>
                </ClearListContainer>

            </FooterWrapper>

        </ContentWrapper>
    );
}

DialogItems.propTypes = {};
DialogItems.defaultProps = {};

export default DialogItems;
