import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import Table from '../common/Table/Table';
import Search from '../common/Search';
import Item from '../common/Table/Item';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import FloatingActionAnnotated from '../common/FloatingAction/FloatingActionAnnotated';
import SuppliersPurchaseOrder from '../Suppliers/SuppliersPurchaseOrder';
import CreatePurchaseOrderDialog from "../Suppliers/CreatePurchaseOrderDialog";
import CreateInventoryDialogContainer from "../Inventory/CreateInventoryDialogContainer";
import DataItem from "../common/List/DataItem";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ConfirmationComponent from '../ConfirmationComponent';

import Cart from '../../../assets/svg/cart';
import ActionItem from "../common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";

import { currencyFormatter } from "../../utils/formatter";
import { withModal } from 'react-native-modalfy';
import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import { getSupplierProducts, createPurchaseOrder } from "../../api/network";
import { addCartItem } from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import _ from "lodash";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { useNavigation } from '@react-navigation/native';


const SearchContainer = styled.View`
    margin-bottom : ${ ({ theme }) => theme.space['--space-20']};
`;

const FooterWrapper = styled.View`
    width: 100%;
    position : absolute;
    bottom : 20px; 
`;
const FooterContainer = styled.View`
    width :100%;
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    justify-content: space-between;
`;

const PaginatorActionsContainer = styled.View`
    display : flex;
    justify-content : space-between;
    align-items : center;
    flex-direction : row;
`


function SupplierProductsTab({ modal, supplierId, addCartItem, cart, products, onAddProducts, isArchive = false }) {

    // ######## STATES
    console.log("Cart: ", cart)
    const theme = useTheme();
    const navigation = useNavigation();


    const [checkBoxList, setCheckBoxList] = useState([])
    const [isFetching, setFetching] = useState(false);
    const [hasActionButton, setHasActionButton] = useState(!isArchive);

    const recordsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [tabDetails, setTabDetails] = useState([]);

    const [isFloatingActionDisabled, setFloatingAction] = useState(false)
    const [cartTotal, setCartTotal] = useState(cart.length)
    const [cartItems, setCartItems] = useState([])

    // ######## CONST

    const headers = [
        {
            name: "Product",
            alignment: "flex-start",
            flex: 2
        },
        {
            name: "Reference",
            alignment: "flex-start"
        },
        {
            name: "SKU",
            alignment: "center"
        },
        {
            name: "Price",
            alignment: "flex-end"
        }
    ]

    // ######## LIFECYCLE METHODS

    useEffect(() => {
        setTimeout(() => {
            setCartItems(cart)
            // onUpdateItems(cart);
            setTotalPages(Math.ceil(products.length / recordsPerPage))
        }, 200)
    }, [])

    // useEffect(() => {
    //     // if (!products.length) fetchProducts()
    //     setTotalPages(Math.ceil(products.length / recordsPerPage))
    // }, []);

    // ######## EVENT HANDLERS

    const onProductsPress = (productItem) => () => {
        // open product page.
        navigation.navigate("SupplierProductPage", {product: productItem} )
    }

    const onSearchChange = (input) => {
        setSearchValue(input)
    }

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const toggleCheckbox = (item) => () => {
        let updatedCases = [...checkBoxList];

        if (updatedCases.includes(item)) {
            updatedCases = updatedCases.filter(caseItem => caseItem !== item)
        } else {
            updatedCases.push(item);
        }
        setCheckBoxList(updatedCases);
    }

    const toggleHeaderCheckbox = () => {
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== tabDetails.length;

        if (indeterminate) {
            const selectedAllIds = [...tabDetails.map(item => item)]
            setCheckBoxList(selectedAllIds)
        } else {
            setCheckBoxList([])
        }
    }

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: actions(),
                title: "SUPPLIER ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                },
            })
    }

    const toggleCartActionButton = () => {

        setTimeout(() => {
            modal.openModal('OverlayInfoModal', {
                overlayContent: <SuppliersPurchaseOrder
                    details={cartItems}
                    onUpdateItems={onUpdateItems}
                    onClearPress={onClearPress}
                    onListFooterPress={onConfirmChanges}
                />,
            })
        }, 200)
    }

    const onClearPress = () => {
        // setCartItems([])
        // updateCartItems([])
        addCartItem([])
        setCartTotal(0)
        setCartItems([])
        setCheckBoxList([])
    }

    const onUpdateItems = (data) => {
        const total = data.reduce((acc, curr) => acc + (curr.amount || 0), 0)
        let updatedData = data.map(item => {
            return { ...item, amount: item.amount ? item.amount : 0 }
        })
        setCartItems(data)
        addCartItem(data)
        // updateCartItems(data)
        // console.log("Data: ", data)
        // setCartTotal(total)

    }

    const onListFooterPress = (data) => {
        // console.log("List: ", data)
        let { purchaseOrders = [], deliveryDate = ""} = data
        addCartItem(purchaseOrders);
        // updateCartItems(data)
        setCartItems(purchaseOrders);
        onCompleteOrder(data)
    }

    const onCompleteOrder = (data) => {
        let { purchaseOrders = [], deliveryDate = ""} = data
        let orderToCreate = {
            deliveryDate,
            orders : purchaseOrders,
            supplier : supplierId,
        }

        console.log("Data: ", orderToCreate)

        createPurchaseOrder(orderToCreate)
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError = {false}
                            isEditUpdate = {false}
                            onAction = {()=> {
                                modal.closeModals('ConfirmationModal');
                            }}
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')}
                    });
                addCartItem([]);
                setCartItems([]);
                setCheckBoxList([]);

                // Alert.alert("Success", "Purchase order successfully created.")
            })
                .catch(error => {
                    console.log("Failed to create PO", error)
                    modal.openModal(
                        'ConfirmationModal',
                        {
                            content: <ConfirmationComponent
                                isError = {true}
                                isEditUpdate = {false}
                                onCancel = {()=> {
                                    modal.closeModals('ConfirmationModal');
                                }}
                            />
                            ,
                            onClose: () => {modal.closeModals('ConfirmationModal')}
                        })
                    // Alert.alert("Failed", "Purchase order was not created, please try again.")
                    //TODO handle error cases.
                })


    }

    const onConfirmChanges = (data) => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError = {false}
                    isEditUpdate = {true}
                    onAction = {()=> {
                        modal.closeModals('ConfirmationModal');
                        setTimeout(()=>{
                            modal.closeModals('OverlayInfoModal');
                            onListFooterPress(data);
                        },200);

                        // setTimeout(()=>{
                        //     onShowSuccessScreen();
                        // },200)

                    }}
                    onCancel = {()=>{
                        modal.closeModals('ConfirmationModal');
                    }}
                    message = "Do you want to save your changes ?"
                />
                ,
                onClose: () => {modal.closeModals('ConfirmationModal')}
            })
    };

    const onShowSuccessScreen = () =>{
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError = {false}
                    isEditUpdate = {false}
                    onAction = {()=> {
                        modal.closeModals('ConfirmationModal');
                    }}
                />
                ,
                onClose: () => {modal.closeModals('ConfirmationModal')}
            })
    }

    const onOrderComplete = (fields, data) => {
        modal.closeModals('OverlayModal')

        setTimeout(() => {
            const { name = "", storageLocation = {} } = fields
            const updatedOrders = data
                .filter(item => { if (item.amount || item.amount !== 0) { return true } })
                .map(item => { return { amount: item.amount, productId: item._id } })
            let newPO = {
                name: name,
                storageLocation: storageLocation._id,
                supplier: supplierId,
                orders: updatedOrders,
                orderDate: new Date()
            }
            createPurchaseOrder(newPO)
                .then(data => {
                    console.log("DB data: ", data)
                    Alert.alert("Success", "Purchase order successfully created.")
                })
                .catch(error => {
                    console.log("Failed to create PO", error)
                    Alert.alert("Failed", "Purchase order was not created, please try again.")
                    //TODO handle error cases.
                })
            console.log("Purchase Order: ", newPO)
            // console.log("Cart Items: ", cartOrderItems)
        }, 200)

    }

    // ######## HELPER FUNCTIONS

    const actions = () => {
        let isDisabled = checkBoxList.length === 0 ? true : false;
        const addCart =
            <ActionItem
                title={"Add to Cart"}
                icon={<AddIcon strokeColor = {isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-600']}/>}
                disabled = {isDisabled}
                touchable = {!isDisabled}
                onPress={openCartDailog}
            />;
        const addProduct = <ActionItem title={"Add Product"} icon={<AddIcon />} onPress={openAddProduct} />;
        return <ActionContainer
            floatingActions={[
                addCart,
                // addProduct
            ]}
            title={"SUPPLIER ACTIONS"}
        />
    }

    const openCartDailog = () => {

        let cartArray = []
        let updatedCheck = [...checkBoxList]
        if (updatedCheck.length === 0) {
            cartArray = cartItems
        } else {
            cartItems.forEach(item => {
                let isFilterCheck = checkBoxList.filter(checkItem => checkItem._id === item._id)
                if (isFilterCheck) {
                    cartArray.push({...item, amount: 1})
                }
                let index = updatedCheck.findIndex(checkItem => checkItem._id === item._id)
                updatedCheck = [
                    ...updatedCheck.slice(0, index),
                    ...updatedCheck.slice(index + 1),
                ];
            })
        }
        cartArray = [...cartArray, ...updatedCheck]

        modal.closeModals('ActionContainerModal')

        setFloatingAction(false)
        setCartItems([...cartArray])
        setCartTotal(cartArray.length)
    }

    const addItemComplete = (data) => {
        modal.closeModals('OverlayModal')
        setTimeout(() => {
            onAddProducts(data)
        }, 200)
    }

    const openAddProduct = () => {
        modal.closeModals('ActionContainerModal')

        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <CreateInventoryDialogContainer
                        onCreated={(item) => addItemComplete(item)}
                        onCancel={() => setFloatingAction(false)}
                    />,
                    onClose: () => setFloatingAction(false)
                })
        }, 200)
    }

    const listItemFormat = (item) => <>
        <DataItem text={item?.name} flex={2} fontStyle="--text-base-medium" color="--color-blue-600" />
        <DataItem text={item?.inventoryVariant?.name} />
        <DataItem text={item?.sku || 'n/a'} align="center" />
        <DataItem text={`$ ${currencyFormatter(item.unitPrice)}`} align="flex-end" />
        {/* <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item?.sku || 'n/a'}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
        </View> */}
    </>;

    const renderListFn = (item) => {
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={onProductsPress(item)}
            itemView={listItemFormat(item)}
        />
    }

    let productsToDisplay = [...products];
    productsToDisplay = productsToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            <SearchContainer theme={theme}>
                <Search
                    placeholderText="Search by Product"
                    changeText={onSearchChange}
                    inputText={searchValue}
                />
            </SearchContainer>

            <Table
                data={productsToDisplay}
                listItemFormat={renderListFn}
                headers={headers}
                isCheckbox={true}
                toggleHeaderCheckbox={toggleHeaderCheckbox}
                itemSelected={checkBoxList}
            />

            <FooterWrapper>
                <FooterContainer>

                    <FloatingActionAnnotated
                        toggleActionButton={toggleCartActionButton}
                        icon = {Cart}
                        value = {cartTotal}
                        showValue =  {cartTotal !== 0}
                    />

                    <PaginatorActionsContainer>
                        <RoundedPaginator
                            totalPages={totalPages}
                            currentPage={currentPagePosition}
                            goToNextPage={goToNextPage}
                            goToPreviousPage={goToPreviousPage}
                            isNextDisabled={false}
                            isPreviousDisabled={false}
                        />

                        <FloatingActionButton
                            isDisabled={isFloatingActionDisabled}
                            toggleActionButton={toggleActionButton}
                        />

                    </PaginatorActionsContainer>

                </FooterContainer>
            </FooterWrapper>
            {/* <View style={styles.footer}>
                <View>
                    <FloatingActionAnnotated
                        toggleActionButton={toggleCartActionButton}
                        icon = {Cart}
                        value = {cartTotal}
                        showValue =  {cartTotal !== 0}
                    />
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingRight:20}}>
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

            </View> */}
        </>
    )
}

SupplierProductsTab.propTypes = {};
SupplierProductsTab.defaultProps = {};

const mapStateToProps = (state) => ({
    cart: state.cart
});

const mapDispatchToProp = {
    addCartItem
}

export default connect(mapStateToProps, mapDispatchToProp)(withModal(SupplierProductsTab));

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
    footer: {
        flex: 1,
        width: '100%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        // marginBottom: -10,
        right: 0,
        // marginRight: 30,
        // backgroundColor:'red',
        justifyContent: 'space-between'
    },
})
