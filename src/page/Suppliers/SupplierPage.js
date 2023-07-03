import React, {useState, useEffect, useContext} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useModal} from 'react-native-modalfy';
import {set} from 'numeral';
import {connect} from 'react-redux';
import SlideOverlay from '../../components/common/SlideOverlay/SlideOverlay';
import SupplierDetailsTab from '../../components/OverlayTabs/SupplierDetailsTab';
import SupplierProductsTab from '../../components/OverlayTabs/SupplierProductsTab';
import SuppliersInvoicePage from '../../components/OverlayTabs/SuppliersInvoicePage';
import SupplierPurshaseOrders from '../../components/OverlayTabs/SupplierPurchaseOrders';
import BottomSheetContainer from '../../components/common/BottomSheetContainer';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import ConfirmationComponent from '../../components/ConfirmationComponent';

import {getSupplierById, createPurchaseOrder, getSupplierProducts, getPurchaseOrders} from '../../api/network';
import {colors} from '../../styles';
import {updateSupplierAction} from '../../redux/actions/suppliersActions';
import LoadingIndicator from '../../components/common/LoadingIndicator';

function SupplierPage({route, navigation, updateSupplierAction}) {
    const {supplier, isOpenEditable, floatingActions, handleDataRefresh} = route.params; 
    const purchaseOrderPermissions =route.params. purchaseOrderPermissions
    const updateSuppliers = route.params.updateSuppliers
    console.log('djsk', updateSuppliers)
    const modal = useModal();
    const currentTabs = ['Details', 'Products', 'Purchase Orders'];
    const {
        supplierNumber = '',
        name = '',
        _id = '',
    } = supplier;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [editableTab, setEditableTab] = useState(currentTab);
    const [isFetching, setFetching] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState({});
    const [pageState, setPageState] = useState({});
    const [hasFetchProducts, setHasFetchProducts] = useState(false);
    // const [cartOrderItems, setCartOrderItems] = useState([])
    const [products, setProducts] = useState([]);

    const [popoverList, setPopoverList] = useState([]);

    const {isEditMode} = pageState;

    // ##### Lifecycle Methods
    useEffect(() => {
        setTimeout(() => {
            if (!products.length) {
                // fetchProducts();
                fetchSupplier(_id);
            }
        }, 200); 

        
    }, []);

    // ##### Event Handlers
    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    const onCancelErrorScreen = () => {
        modal.closeAllModals();
        setTimeout(() => {
            backTapped();
        }, 200);
    };

    const onTabPress = selectedTab => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    
    const backTapped = () => {
        // here
        navigation.navigate('Suppliers');
        
    };

    const handlePopovers = popoverValue => popoverItem => {
        if (!popoverItem) {
            const updatedPopovers = popoverList.map(item => ({
                ...item,
                status: false
            }));

            setPopoverList(updatedPopovers);
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = {...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers);
        }
    };

    const onAddProducts = item => {
        console.log('DATA: ',);
        const newItem = {
            ...item,
            unitCost: item.unitPrice
        };
        setProducts([...products, newItem]);
    };

    // ##### Helper functions

    const errorScreen = () => {
        setTimeout(() => {
            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={true}
                            onCancel={onCancelErrorScreen}
                            message="There was an issue performing this action."
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
        }, 100);
    };

    const fetchProducts = () => {
        setPageLoading(true);
        getSupplierProducts(_id, '')
            .then(productsData => {
                const {data = [], pages = 0} = productsData;
                console.log("Fetch: ", _id);
                setProducts(data);
                setHasFetchProducts(true);
            })
            .catch(error => {
                console.log('Failed to get products', error);
                //TODO handle error cases.
                errorScreen();
                //CONFORMATION SCREEN
            })
            .finally(_ => {
                setPageLoading(false);
                console.log("Finished");
            });
    };

    const fetchSupplier = id => {
        setFetching(true);
        setPageLoading(true);
        handleDataRefresh();
        
        getSupplierById(id)
            .then(data => {
                
                setSelectedSupplier(data);
                setProducts(data?.products || []);
            })
            .catch(error => {
                console.log('Failed to get supplier', error);
                if (hasFetchProducts === false) {
                    setTimeout(() => {
                        modal.closeModals('ConfirmationModal');
                    }, 100);
                    errorScreen();
                }

                // confirmation screeen
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    const supplierInfoUpdated = updatedInfo => {
        const newState = {_id, ...selectedSupplier, ...updatedInfo};
        setSelectedSupplier(newState);
        updateSupplierAction(newState);
    };

    const onUpdatePurchaseOrders = data => {
        setSelectedSupplier({
            ...selectedSupplier,
            purchaseOrders: [...data]
        });
    };

    const getIsEditable = () => {
        switch (currentTab) {
            case 'Products':
                return true;
            case 'Invoices':
                return true;
            default:
                return false;
        }
    };

    // const supplierDetails = { supplier, status: '' }
    const getTabContent = selectedTab => {
        switch (selectedTab) {
            case 'Details':
                return <SupplierDetailsTab
                    order={{supplier: selectedSupplier, status: ''}}
                    supplierId={_id}
                    onUpdated={supplierInfoUpdated}
                    isEditMode={isEditMode}
                    refresh={() => { setPageLoading(true); fetchSupplier(_id)}}
                />;
            case 'Products':
                return pageState.isLoading ?
                    <LoadingIndicator/> : (
                        <SupplierProductsTab
                            products={products}
                            onAddProducts={onAddProducts}
                            onProductsCreated={() => fetchSupplier(_id)}
                            onRefresh={() => fetchSupplier(_id)}
                            supplierId={_id} 
                            permissions={purchaseOrderPermissions}

                            //onRefresh={() => { console.log("Refreshing"); setPageLoading(true); fetchSupplier(_id); }}
                        />
                    );
            case 'Purchase Orders':
                return <SupplierPurshaseOrders
                    floatingActions={floatingActions}
                    data={selectedSupplier?.purchaseOrders}
                    onRefresh={() => fetchSupplier(_id)}
                    onUpdatePurchaseOrders={onUpdatePurchaseOrders}
                    isEditMode={isEditMode}
                    supplierName={name}
                    supplierId={_id}
                />;
            // case 'Invoices':
            //     return <SuppliersInvoicePage
            //         supplierName={name}
            //         // data={[]}
            //     />;
            default:
                return <View/>;
        }
    };

    return (

        <>
            <PageContext.Provider value={{pageState, setPageState}}>
                <DetailsPage
                    isEditable={updateSuppliers}
                    headerChildren={[selectedSupplier.name]}
                    onBackPress={backTapped}
                    isArchive={getIsEditable()}
                    pageTabs={(
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={currentTab}
                            onPressChange={onTabPress}
                        />
                    )}
                >

                    {getTabContent(currentTab)}

                </DetailsPage>
            </PageContext.Provider>
        </>

    );
}

SupplierPage.propTypes = {};
SupplierPage.defaultProps = {};

const mapDispatcher = {updateSupplierAction};

export default connect(null, mapDispatcher)(SupplierPage);

const styles = StyleSheet.create({
    item: {flex: 1, },
    itemText: {
        fontSize: 16,
        color: '#4A5568',
    },
});
