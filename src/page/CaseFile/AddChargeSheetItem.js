import React, {useState, useEffect} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from "emotion-theming";
import CreatePageHeader from '../../components/common/DetailsPage/CreatePageHeader';
import CreatePageDoneFooter from '../../components/common/DetailsPage/CreatePageDoneFooter';
import CreationDialogTabs from '../../components/common/Dialog/CreationDialogTabs';
import LineDivider from '../../components/common/LineDivider';
import Paginator from '../../components/common/Paginators/Paginator';
import Table from "../../components/common/Table/Table";
import DeleteIcon from '../../../assets/svg/wasteIcon';
import NumberChangeField from '../../components/common/Input Fields/NumberChangeField';
import IconButton from "../../components/common/Buttons/IconButton";
import DataItem from "../../components/common/List/DataItem";
import ContentDataItem from "../../components/common/List/ContentDataItem";
import ConfirmationComponent from '../../components/ConfirmationComponent';

import SearchableOptionsField from '../../components/common/Input Fields/SearchableOptionsField';

import {useNextPaginator, usePreviousPaginator} from '../../helpers/caseFilesHelpers';
import {getInventories, getEquipmentTypes} from "../../api/network";
import {useModal} from 'react-native-modalfy';
import _ from "lodash";
import {Alert} from 'react-native';
import DefaultPage from "../../components/common/Page/DefaultPage";


const PageWrapper = styled.View`
    height : 100%;
    width : 100%;
    background-color : ${({theme}) => theme.colors['--default-shade-white']}; 
`;

const TabsContainer = styled.View`
    height : 59px;
`;

const ContentWrapper = styled.View`
    height : 780px;
    margin-left : ${({theme}) => theme.space['--space-8']};
    margin-right :${({theme}) => theme.space['--space-16']};
    padding-left : ${({theme}) => theme.space['--space-14']};
    padding-right :${({theme}) => theme.space['--space-14']};
    padding-top :${({theme}) => theme.space['--space-32']};

`;

const ContentContaienr = styled.View`
    height : 100%;
    position : relative;
`;

const ContentFooterContainer = styled.View`
    height : 32px;
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
    position : absolute;
    bottom: 0;
    align-items : center;
`;

const AddItemsWrapper = styled.View`
    height : 360px;
    width : 100%;
`;
const AddItemsContainer = styled.View`
    flex : 1;
`;

const SearchableFieldContainer = styled.View`
    z-index : 1;
    margin-bottom : ${({theme}) => theme.space['--space-24']}; 

    /* margin-bottom : 24px; */
`

const ListContainer = styled.View`
    flex:1;
    margin-top : ${({theme}) => theme.space['--space-40']}; 
    /* background-color : red; */
`;
const Row = styled.View`
    /* width : 100%; */
    height : 20px;
    flex-direction : row;
    margin-bottom : ${({theme}) => theme.space['--space-24']}; 

`
const PaginatorContainer = styled.View`
    height : 100%;
    width : 122px;
    border : 1px solid ${({theme}) => theme.colors['--color-gray-400']};
    border-radius : 4px;
`;

const ContentFooterText = styled.Text(({theme}) => ({
    ...theme.font['text-base-regular'],
    color: theme.colors['--color-gray-700'],
}));

const Divider = styled.View`
    margin-left : ${({theme}) => theme.space['--space-24']};
    margin-right :${({theme}) => theme.space['--space-32']};
    margin-top : ${({theme}) => theme.space['--space-24']};
    margin-bottom : ${({theme}) => theme.space['--space-24']};
`

const FooterWrapper = styled.View`
    width : 100%;
    position : absolute;
    bottom : 0;
    margin-bottom : ${({theme}) => theme.space['--space-24']};
    /* margin-top : ${({theme}) => theme.space['--space-24']}; */
    padding-left : ${({theme}) => theme.space['--space-24']};
    padding-right :${({theme}) => theme.space['--space-24']};
`;

const FooterContainer = styled.View`
    flex:1;
`;


function AddChargeSheetItem({navigation, route}) {

    const {type, onAddItem, selectedObj} = route.params;
    const modal = useModal();

    let name = type === 'Consumables' ? 'Consumable' : 'Equipment';
    const headers = [
        {
            name: name,
            alignment: "flex-start",
            flex: 1,
        },
        {
            name: 'Amount',
            alignment: "center",
            flex: 1
        },
        {
            name: 'Action',
            alignment: "flex-end",
            flex: 1
        },
    ]

    const theme = useTheme();
    const [data, setData] = useState([]);

    const recordsPerPage = 6
    const dataLength = data.length
    const totalPages = Math.ceil(dataLength / recordsPerPage)

    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedItem, setSelectedItem] = useState(false);


    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(type === 'Consumables' ? fetchInventory : fetchEquipment, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchValue]);

    const fetchInventory = () => {
        getInventories(searchValue, 5)
            .then(inventoryResult => {
                const {data = [], pages = 0} = inventoryResult
                setSearchResults(data);
            })
            .catch(error => {
                // todo handle error
                console.log("Failed to fetch inventory", error);
                // Alert.alert("Failed", "Failed to get suggestions, please try again.")
                setSearchResults([])
            })
    }

    const fetchEquipment = () => {
        getEquipmentTypes(searchValue, 5)
            .then(equipmentResult => {
                const {data = [], pages = 0} = equipmentResult
                setSearchResults(data);
            })
            .catch(error => {
                // todo handle error
                console.log("Failed to fetch equipment", error);
                // Alert.alert("Failed", "Failed to get suggestions, please try again.")
                setSearchResults([])
            })
    };


    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition > 1) {
            let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax)
        }
    };

    const onBackPress = () => {
        navigation.goBack();
    };

    const onFooterPress = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        onBackPress();
                        onAddItem(configureData(data));
                        modal.closeAllModals();
                    }}
                    message={"Do you want to save these item(s)?"}

                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };


    const onQuantityChange = (item) => (action) => {
        const {amount = 1} = item

        const updatedObj = {
            ...item,
            amount: action === 'add' ? amount + 1 : amount === 1 ? amount : amount - 1
        };

        const updatedData = data.map(item => {
            return item._id === updatedObj._id
                ? {...updatedObj}
                : {...item}
        })

        setData(updatedData)
    }

    const onAmountChange = (item) => (value) => {

        const updatedObj = {
            ...item,
            amount: value === '' ? '' : parseFloat(value) < 1 ? 1 : parseInt(value)
        };

        const updatedData = data.map(item => {
            return item._id === updatedObj._id
                ? {...updatedObj}
                : {...item}
        })

        setData(updatedData)
    }

    const onItemSelected = (item) => {
        // console.log("Seleted item: ", item);

        console.log("item selected", item);

        let updatedItem = {};
        let items = type === 'Consumables' ? selectedObj?.inventories : selectedObj?.equipments
        let filterItem = items.filter(dataItem => dataItem?.inventory?._id === item?._id);
        // console.log("Items: ", items)
        if (type === 'Consumables') {
            updatedItem = {
                _id: item._id,
                inventory: {
                    _id: item?._id,
                    inventoryGroup: item?.inventoryGroup
                },
                ...item,
                amount: 1,
            }

            delete (updatedItem.inventoryGroup);
        } else {
            console.log("Selected obj: ", selectedObj);
            console.log("iTEM: ", item)
            updatedItem = {
                _id: item._id,
                equipment: {
                    ...item
                },
                amount: 1,
                name: item.name
            };

        }

        // console.log("Updated item: ", updatedItem)
        setSelectedItem(updatedItem);
        setSearchValue(updatedItem);

        if (filterItem.length > 0) {
            Alert.alert("Failed", `Item is already added to the ${type} list`);
        } else {

            if (data.length === 0) {
                setData([...data, updatedItem])
            } else {

                data.map(dataItem => {
                    if (dataItem._id === updatedItem._id) {
                        console.log("Same")
                        setData([...data])
                    } else {
                        console.log('Dis')
                        setData([...data, updatedItem])
                    }
                })
            }
        }


        // const updatedData = data.length === 0 ?
        //     [...data,item]
        //     :
        //     data.map( dataItem => {
        //         dataItem?._id === item?._id ?
        //             [...data]
        //             :
        //             [...data,item]
        //     })
        // setData(updatedData)

    }

    const configureData = (data) => {
        if (type === 'Consumables') {
            return data.map(dataItem => ({
                ...dataItem,
                inventory: {
                    ...dataItem.inventory,
                    name: dataItem.name,
                    unitCost: dataItem.unitCost
                }
            }))
        } else {
            return data;
        }
    }

    const onClearItem = () => {
        setSelectedItem(false);
        setSearchValue('');
    }

    const handleDeleteItem = (item) => {
        const filterItems = data.filter(obj => obj._id !== item._id)
        setData(filterItems)
    };

    const listItemFormat = (item) => {
        const {_id = "", name = "", amount = 1} = item
        return (
            <Row theme={theme}>
                <DataItem text={name} flex={1} fontStyle="--text-base-medium" color="--color-blue-600"/>
                <NumberChangeField
                    onChangePress={onQuantityChange(item)}
                    onAmountChange={onAmountChange(item)}
                    value={amount.toString() || 1}
                />
                <ContentDataItem
                    align="flex-end"
                    content={
                        <IconButton
                            Icon={<DeleteIcon/>}
                            onPress={() => handleDeleteItem(item)}
                        />
                    }
                />
            </Row>
        )
    }

    let dataToDisplay = [...data]
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax)

    return (
        <DefaultPage pageTitle={`Add ${type}`} onClosePress={onBackPress} theme={theme}>

            <TabsContainer>
                <CreationDialogTabs
                    tabs={[type]}
                    tab={0}
                    backgroundColor="--color-gray-200"
                />
            </TabsContainer>

            <ContentWrapper theme={theme}>
                <ContentContaienr>

                    <AddItemsWrapper>
                        <AddItemsContainer>

                            <SearchableFieldContainer>
                                <SearchableOptionsField
                                    value={selectedItem}
                                    text={searchValue}
                                    oneOptionsSelected={(item) => onItemSelected(item)}
                                    onChangeText={(value) => {
                                        setSearchValue(value)
                                    }}
                                    onClear={onClearItem}
                                    options={searchResults}
                                    handlePopovers={() => {
                                        // console.log("handle popovers");
                                    }}
                                    isPopoverOpen={searchQuery}
                                    borderColor={theme.colors['--color-gray-400']}
                                />
                            </SearchableFieldContainer>

                            <ListContainer>
                                <Table
                                    data={dataToDisplay}
                                    currentListMin={currentPageListMin}
                                    currentListMax={currentPageListMax}
                                    listItemFormat={listItemFormat}
                                    headers={headers}
                                    isCheckbox={false}
                                />
                            </ListContainer>

                        </AddItemsContainer>
                    </AddItemsWrapper>

                    <ContentFooterContainer>

                        <PaginatorContainer>
                            <Paginator
                                currentPage={currentPagePosition}
                                totalPages={totalPages === 0 ? 1 : totalPages}
                                goToNextPage={goToNextPage}
                                goToPreviousPage={goToPreviousPage}
                                hasNumberBorder={false}
                                isNextDisabled={isNextDisabled}
                                isPreviousDisabled={isPreviousDisabled}
                            />
                        </PaginatorContainer>
                        <ContentFooterText>
                            Showing {
                            dataLength === recordsPerPage
                                ? recordsPerPage
                                : dataLength

                        } of {dataLength}
                        </ContentFooterText>
                    </ContentFooterContainer>

                </ContentContaienr>
            </ContentWrapper>

            <Divider>
                <LineDivider/>
            </Divider>


            <FooterWrapper theme={theme}>
                <FooterContainer>
                    <CreatePageDoneFooter onFooterPress={onFooterPress}/>
                </FooterContainer>
            </FooterWrapper>

        </DefaultPage>
    )
}

AddChargeSheetItem.propTypes = {};
AddChargeSheetItem.defaultProps = {};

export default AddChargeSheetItem
