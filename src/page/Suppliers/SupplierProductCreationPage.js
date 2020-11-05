import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native'
import {useTheme} from "emotion-theming";
import {useNavigation} from "@react-navigation/native"
import PropTypes from 'prop-types';
import DefaultPage from "../../components/common/Page/DefaultPage";
import Button from "../../components/common/Buttons/Button";
import PageButton from "../../components/common/Page/PageButton";
import SearchableOptionsField from "../../components/common/Input Fields/SearchableOptionsField";
import Table from "../../components/common/Table/Table";
import Paginator from "../../components/common/Paginators/Paginator";
import LineDivider from "../../components/common/LineDivider";
import CreatePageDoneFooter from "../../components/common/DetailsPage/CreatePageDoneFooter";
import {
    createNewProcedure,
    createSupplierProductsCall,
    getInventories,
    getInventoryVariantByGroup
} from "../../api/network";
import _ from "lodash";
import InputField2 from "../../components/common/Input Fields/InputField2";
import IconButton from "../../components/common/Buttons/IconButton";
import DeleteIcon from "../../../assets/svg/deleteIcon";
import CancelIcon from "../../../assets/svg/CancelIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";
import InfoIcon from "../../../assets/svg/InfoIcon";
import LoadingComponent from "../../components/LoadingComponent";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import {useModal} from "react-native-modalfy";


const PageWrapper = styled.View`
  flex: 1;
`


const PageHeaderWrapper = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${({theme}) => theme.colors['--color-gray-200']};
  align-items: center;
  justify-content: center;
`


const PageHeaderButtonWrapper = styled.View`
 width: 103px;
 height: 23px;
 //align-items: center;
 //justify-content: center;
`


const PageContent = styled.View`
  flex: 1;
`

const ContentWrapper = styled.View`
    height : 780px;
    margin-left : ${({theme}) => theme.space['--space-8']};
    margin-right :${({theme}) => theme.space['--space-16']};
    padding-left : ${({theme}) => theme.space['--space-14']};
    padding-right :${({theme}) => theme.space['--space-14']};
    padding-top :${({theme}) => theme.space['--space-32']};

`;

const ContentContainer = styled.View`
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
    display: flex;
    height: 24px;
    flex-direction: row;
   
    /* margin-bottom : 24px; */
`

const ListContainer = styled.View`
    flex:1;
    margin-top : ${({theme}) => theme.space['--space-40']}; 
    /* background-color : red; */
`;
const Row = styled.View`
    /* width : 100%; */
    height : 34px;
    flex: 1;
    display: flex;
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

const RowCellWrapper = styled.View(({flex, justifyContent}) => ({
    display: 'flex',
    flex: flex || 1,
    flexDirection: 'row',
    justifyContent: justifyContent || 'centre',
    alignItems: 'center',
    marginRight: 8
}))


const headers = [
    {
        name: 'Product Name',
        alignment: "flex-start",
        flex: 1,
    },
    {
        name: 'Item Reference',
        alignment: "flex-start",
        flex: 1
    },
    {
        name: 'Unit Price',
        alignment: "flex-start",
        flex: 1
    },
    {
        name: 'Action',
        alignment: "center",
        flex: .4
    },
]

function SupplierProductCreationPage({route}) {
    const {
        onProductsCreation = () => {
        }, supplierId
    } = route.params;
    const theme = useTheme();
    const modal = useModal()
    const navigation = useNavigation();

    const [data, setData] = useState([]);

    const recordsPerPage = 6
    const dataLength = data.length
    const totalPages = Math.ceil(dataLength / recordsPerPage)

    const [isLoading, setLoading] = useState(false);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedItem, setSelectedItem] = useState(false);

    //region Lifecycle Methods
    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
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
    }, [searchValue]);
    //endregion

    // region Event Handlers
    const onClosePress = () => {
        navigation.goBack()
    }

    const onDonePress = () => {

        // validate data

        // create products
        creatProducts()
    }

    const onClearItem = () => {

    }

    const goToNextPage = () => {

    }

    const goToPreviousPage = () => {

    }

    const onItemSelected = (item) => {
        // add item to list.

        const isItemContains = data.some(dataItem => item._id === dataItem.inventoryVariant?._id)
        if (isItemContains) return;

        setData([
            {
                name: item?.name,
                unitPrice: 0,
                inventoryVariant: {...item}
            },
            ...data
        ])

        setSearchValue('')
        setSearchResults([])
    }

    const onUpdateValue = (field, selectedIndex) => value => {
        const updatedData = data.map((item, index) => {
            return selectedIndex === index
                ? {...item, [field]: value}
                : {...item}
        })

        setData(updatedData);
    }

    const onRemoveItem = (itemIndex) => {
        const updatedData = [...data]
        updatedData.splice(itemIndex, 1);
        setData(updatedData);
    }

    // endregion

    // region helper functions
    const listItemFormat = (item, index) => {
        const {_id = "", name = "", unitPrice, inventoryVariant = {}} = item
        return (
            <Row theme={theme}>

                <RowCellWrapper>
                    <InputField2
                        value={name}
                        onClear={onUpdateValue('name', index)}
                        onChangeText={onUpdateValue('name', index)}
                    />
                </RowCellWrapper>

                <RowCellWrapper>
                    <InputField2
                        enabled={false}
                        value={inventoryVariant?.name}
                    />
                </RowCellWrapper>

                <RowCellWrapper>
                    <InputField2
                        value={unitPrice}
                        onClear={onUpdateValue('unitPrice', index)}
                        onChangeText={(value) => {
                            if (!isNaN(value))
                                onUpdateValue('unitPrice', index)(value)
                        }}
                    />
                </RowCellWrapper>

                <RowCellWrapper flex={.4}>
                    <IconButton
                        Icon={<WasteIcon/>}
                        onPress={() => onRemoveItem(index)}
                    />
                </RowCellWrapper>
            </Row>
        )
    }

    const fetchInventory = () => {
        getInventories(searchValue, 5, 1)
            .then(results => {
                setSearchResults(results?.data || [])
            })
            .catch(error => {
                console.log("Failed to find inventory data")
            })
    }

    const creatProducts = () => {
        setLoading(true);

        console.log("create products", data);

        const createProductsData = data.map(item => {
            return {
                "name": item.name,
                "type": "inventory",
                "sku": "",
                "unitPrice": item.unitPrice,
                "inventoryVariant": item.inventoryVariant?._id
            }
        })

        createSupplierProductsCall(supplierId, createProductsData)
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            message="Products Created"
                            onCancel={() => {
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                onProductsCreation(data);
                                navigation.goBack();
                            }}
                        />
                        ,
                        onClose: () => {
                            modal.closeModals("ConfirmationModal")
                        }
                    })
            })
            .catch(error => {
                console.log("failed to create products", error.response?.body)
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            message='Failed to create products.'
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                        />
                        ,
                        onClose: () => {
                            modal.closeModals("ConfirmationModal")
                        }
                    })
            })
            .finally(_ => {
                setLoading(false);
            })
    }
    // endregion

    // const dataToDisplay = []

    return (
        <PageWrapper>
            <DefaultPage
                pageTitle={"Create Products"}
                onClosePress={onClosePress}
            >
                <PageHeaderWrapper theme={theme}>
                    <PageHeaderButtonWrapper>
                        <PageButton
                            backgroundColor={theme.colors['--default-shade-white']}
                            fontColor={theme.colors['--color-blue-600']}
                            fontStyle={theme.font['--text-xs-bold']}
                            text={"Consumables"}
                        />
                    </PageHeaderButtonWrapper>
                </PageHeaderWrapper>


                <PageContent>

                    <ContentWrapper theme={theme}>
                        <ContentContainer>

                            <AddItemsWrapper>
                                <AddItemsContainer>

                                    <SearchableFieldContainer>
                                        <SearchableOptionsField
                                            value={null}
                                            text={searchValue}
                                            oneOptionsSelected={onItemSelected}
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
                                            data={data}
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
                                    Clear List
                                </ContentFooterText>
                            </ContentFooterContainer>

                        </ContentContainer>
                    </ContentWrapper>

                    <Divider>
                        <LineDivider/>
                    </Divider>


                </PageContent>

                <FooterWrapper theme={theme}>
                    <FooterContainer>
                        <CreatePageDoneFooter onFooterPress={onDonePress}/>
                    </FooterContainer>
                </FooterWrapper>
            </DefaultPage>


            {
                isLoading &&
                <LoadingComponent/>
            }

        </PageWrapper>
    );
}

SupplierProductCreationPage.propTypes = {};
SupplierProductCreationPage.defaultProps = {};

export default SupplierProductCreationPage;
