import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useModal, withModal } from 'react-native-modalfy';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { useNavigation } from '@react-navigation/native';
import Table from '../common/Table/Table';
import Search from '../common/Search';
import Item from '../common/Table/Item';
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import FloatingActionAnnotated from '../common/FloatingAction/FloatingActionAnnotated';
import SuppliersPurchaseOrder from '../Suppliers/SuppliersPurchaseOrder';
import CreatePurchaseOrderDialog from '../Suppliers/CreatePurchaseOrderDialog';
import CreateInventoryDialogContainer from '../Inventory/CreateInventoryDialogContainer';
import DataItem from '../common/List/DataItem';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import ConfirmationComponent from '../ConfirmationComponent';

import Cart from '../../../assets/svg/cart';
import ActionItem from '../common/ActionItem';
import AddIcon from '../../../assets/svg/addIcon';

import { currencyFormatter } from '../../utils/formatter';
import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../../helpers/caseFilesHelpers';
import { getSupplierProducts, createPurchaseOrder } from '../../api/network';
import { addCartItem } from '../../redux/actions/cartActions';
import LoadingIndicator from '../common/LoadingIndicator';
import { PageContext } from '../../contexts/PageContext';

const SearchContainer = styled.View`
    margin-bottom : ${({ theme }) => theme.space['--space-20']};
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
`;

const headers = [
    {
        name: 'Product',
        alignment: 'flex-start',
        flex: 2
    },
    {
        name: 'Reference',
        alignment: 'flex-start'
    },
    {
        name: 'SKU',
        alignment: 'center'
    },
    {
        name: 'Price',
        alignment: 'flex-end'
    }
];

function SupplierProductsTab({
    supplierId,
    addCartItem,
    cart,
    products = [],
    onAddProducts,
    onProductsCreated,
    isProductsLoading
}) {
    // ######## STATES
    const theme = useTheme();
    const modal = useModal();
    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(false);
    const [checkboxList, setCheckboxList] = useState([]);

    const recordsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);
    const [productsState, setProducts] = useState(products);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [searchValue, setSearchValue] = useState('');

    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [cartTotal, setCartTotal] = useState(cart.reduce((acc, curr) => acc + (curr.amount || 1), 0));
    const [cartItems, setCartItems] = useState([]);
    const { pageState } = useContext(PageContext);



    // ######## CONST


    // ######## LIFECYCLE METHODS

    useEffect(() => {
        setTimeout(() => {
            setCartItems(cart);
            setTotalPages(Math.ceil(productsState.length / recordsPerPage));
        }, 200);
    }, []);


    // ######## EVENT HANDLERS

    const onProductsPress = productItem => () => {
        // open product page.
        modal.closeModals('ActionContainerModal');
        setFloatingAction(true);
        navigation.navigate('SupplierProductPage', { product: productItem, onUpdated: onProductUpdate });
    };

    const onProductUpdate = (value) => {
        const updated = productsState.map(item => {
            return item._id === value._id ? { ...value } : { ...item }
        })
        setProducts(updated)
    }

    const onSearchChange = input => {
        setSearchValue(input);
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const toggleCheckbox = item => () => {
        const itemChecked = checkboxList.some(checkedItem => checkedItem._id === item._id);
        if (itemChecked) {
            // remove it from checkboxList
            const filteredCheckboxList = checkboxList.filter(checkedItem => checkedItem._id !== item._id);
            setCheckboxList([...filteredCheckboxList]);
        } else setCheckboxList([...checkboxList, item]);
    };

    const toggleHeaderCheckbox = () => {
        const productsToDisplay = productsState.slice(currentPageListMin, currentPageListMax);

        if (!checkboxList.length || (checkboxList.length && checkboxList.length < productsToDisplay.length)) {
            setCheckboxList([...productsToDisplay]);
        } else setCheckboxList([]);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: actions(),
                title: 'SUPPLIER PRODUCTS ACTIONS',
                onClose: () => setFloatingAction(false),
            });
    };

    const onClearPress = () => {
        addCartItem([]);
        setCartTotal(0);
        setCartItems([]);
        setCheckboxList([]);
    };

    const onUpdateItems = data => {
        const total = data.reduce((acc, curr) => acc + (curr.amount || 1), 0);

        setCartTotal(total);
        setCartItems(data);
        addCartItem(data);
    };

    const onListFooterPress = data => {
        setLoading(true);

        // console.log("List: ", data)
        const { purchaseOrders = [], deliveryDate = '' } = data;
        addCartItem(purchaseOrders);
        // updateCartItems(data)
        setCartItems(purchaseOrders);
        onCompleteOrder(data);
    };

    const onCompleteOrder = data => {
        const { purchaseOrders = [], deliveryDate = '' } = data;
        const orderToCreate = {
            deliveryDate,
            orders: purchaseOrders,
            supplier: supplierId,
        };

        console.log('Data: ', orderToCreate);

        createPurchaseOrder(orderToCreate)
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onAction={() => {
                                modal.closeModals('ConfirmationModal');
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );

                onClearPress();
                // Alert.alert("Success", "Purchase order successfully created.")
            })
            .catch(error => {
                console.log('Failed to create PO', error);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeModals('ConfirmationModal');
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
                // Alert.alert("Failed", "Purchase order was not created, please try again.")
                //TODO handle error cases.
            })
            .finally(_ => setLoading(false));
    };

    const onConfirmChanges = data => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        setTimeout(() => {
                            modal.closeModals('OverlayInfoModal');
                            onListFooterPress(data);
                        }, 200);

                        // setTimeout(()=>{
                        //     onShowSuccessScreen();
                        // },200)
                    }}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                    }}
                    message="Do you want to save your changes ?"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const onShowSuccessScreen = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={false}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                    }}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    const onOrderComplete = (fields, data) => {
        modal.closeModals('OverlayModal');

        setTimeout(() => {
            const { name = '', storageLocation = {} } = fields;
            const updatedOrders = data
                .filter(item => {
                    if (item.amount || item.amount !== 0) {
                        return true;
                    }
                })
                .map(item => ({
                    amount: item.amount,
                    productId: item._id
                }));
            const newPO = {
                name,
                storageLocation: storageLocation._id,
                supplier: supplierId,
                orders: updatedOrders,
                orderDate: new Date()
            };
            createPurchaseOrder(newPO)
                .then(data => {
                    console.log('DB data: ', data);
                    Alert.alert('Success', 'Purchase order successfully created.');
                })
                .catch(error => {
                    console.log('Failed to create PO', error);
                    Alert.alert('Failed', 'Purchase order was not created, please try again.');
                    //TODO handle error cases.
                });
            console.log('Purchase Order: ', newPO);
            // console.log("Cart Items: ", cartOrderItems)
        }, 200);
    };

    // ######## HELPER FUNCTIONS

    const actions = () => {
        const isDisabled = checkboxList.length === 0;
        const addCart = (
            <ActionItem
                title="Add to Cart"
                icon={<AddIcon
                    strokeColor={isDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-green-600']} />}
                disabled={isDisabled}
                touchable={!isDisabled}
                onPress={addToCartAction}
            />
        );
        const addProduct = <ActionItem title="Add Product" icon={<AddIcon />} onPress={addProductAction} />;
        return <ActionContainer
            floatingActions={[
                addCart,
                addProduct
            ]}
            title="SUPPLIER PRODUCTS ACTIONS"
        />;
    };

    const toggleCartActionButton = () => {
        setTimeout(() => {
            modal.openModal('OverlayInfoModal', {
                overlayContent: <SuppliersPurchaseOrder
                    details={cart}
                    onUpdateItems={onUpdateItems}
                    onClearPress={onClearPress}
                    onListFooterPress={onConfirmChanges}
                />,
            });
        }, 200);
    };

    const addToCartAction = () => {
        let cartQuantity;
        let updatedCheckboxList = [...checkboxList];
        const updatedCartItems = [...cartItems];



        if (!updatedCartItems.length) { // add all the checked items since none exist currently in cart
            updatedCheckboxList = updatedCheckboxList.map(item => ({
                ...item,
                amount: 1
            }));
            updatedCartItems.push(...updatedCheckboxList);
            cartQuantity = updatedCheckboxList.length; // since every item's amount would be defaulted to 1, this can safely be done
        } else {
            updatedCheckboxList.forEach(item => {
                // check if checked item doesn't exist in cartItems, then add
                const itemIndex = updatedCartItems.findIndex(cartItem => cartItem._id === item._id);
                if (itemIndex < 0) {
                    updatedCartItems.push({
                        ...item,
                        amount: 1
                    });
                } else { // increase quantity of item if already exists
                    updatedCartItems[itemIndex].amount = updatedCartItems[itemIndex].amount + 1 || 1;
                }
            });
            cartQuantity = updatedCartItems.reduce((acc, curr) => acc + (curr.amount || 1), 0);
        }

        modal.closeModals('ActionContainerModal');

        console.log("updated cart items", updatedCartItems)

        setFloatingAction(false);
        setCartItems(updatedCartItems);
        setCartTotal(cartQuantity);
        addCartItem(updatedCartItems)
        setCheckboxList([]); // clear checked items

    };

    const onProductsCreation = data => {
        setProducts([...productsState, ...data]);
        setTimeout(() => {
            onProductsCreated();
        }, 200);
    };

    const addProductAction = () => {
        modal.closeModals('ActionContainerModal');
        navigation.navigate('SupplierProductCreation', {
            supplierId,
            onProductsCreation
        });
    };

    const listItemFormat = item => (
        <>
            <DataItem text={item?.name} flex={2} fontStyle="--text-base-medium" color="--color-blue-600" />
            <DataItem text={item?.inventoryVariant?.name} />
            <DataItem text={item?.sku || 'n/a'} align="center" />
            <DataItem text={`$ ${currencyFormatter(item.unitPrice)}`} align="flex-end" />
        </>
    );

    const renderListFn = item => (
        <Item
            hasCheckBox={true}
            isChecked={checkboxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={onProductsPress(item)}
            itemView={listItemFormat(item)}
        />
    );

    let productsToDisplay = [...productsState];
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
                headers={headers}
                isCheckbox={true}
                itemSelected={checkboxList}
                listItemFormat={renderListFn}
                toggleHeaderCheckbox={toggleHeaderCheckbox}
            />

            <FooterWrapper>
                <FooterContainer>

                    <FloatingActionAnnotated
                        toggleActionButton={toggleCartActionButton}
                        icon={Cart}
                        value={cartTotal}
                        showValue={cartTotal !== 0}
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

            {
                isLoading &&
                <LoadingIndicator backgroundColor="white" />
            }
        </>
    );
}

SupplierProductsTab.propTypes = {};
SupplierProductsTab.defaultProps = {};

const mapStateToProps = state => ({ cart: state.cart });

const mapDispatchToProp = { addCartItem };

export default connect(mapStateToProps, mapDispatchToProp)(SupplierProductsTab);

const styles = StyleSheet.create({
    item: { flex: 1 },
    itemText: {
        fontSize: 16,
        color: '#4A5568',
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
});
