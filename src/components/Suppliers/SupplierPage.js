import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import SupplierDetailsTab from '../OverlayTabs/SupplierDetailsTab';
import SupplierProductsTab from '../OverlayTabs/SupplierProductsTab';
import SupplierPurshaseOrders from '../OverlayTabs/SupplierPurchaseOrders';
import BottomSheetContainer from '../common/BottomSheetContainer';
import { PageContext } from "../../contexts/PageContext";
import DetailsPage from "../common/DetailsPage/DetailsPage";
import TabsContainer from "../common/Tabs/TabsContainerComponent";
import ConfirmationComponent from '../ConfirmationComponent';


import { getSupplierById, createPurchaseOrder, getSupplierProducts } from "../../api/network";
import { colors } from "../../styles";
import { useModal } from 'react-native-modalfy';
import { set } from 'numeral';


function SupplierPage({ route, navigation }) {
    const { supplier, isOpenEditable, floatingActions } = route.params;
    const modal = useModal();
    const currentTabs = ["Details", "Products", "Purchase Orders"];
    const {
        supplierNumber = "",
        name = "",
        _id = "",
    } = supplier;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState(currentTab)
    const [isFetching, setFetching] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState({});
    const [pageState, setPageState] = useState({});
    const [hasFetchProducts, setHasFetchProducts] = useState(false)
    // const [cartOrderItems, setCartOrderItems] = useState([])
    const [products, setProducts] = useState([])

    const [fields, setFields] = useState({})
    const [popoverList, setPopoverList] = useState([])

    // ##### Lifecycle Methods
    useEffect(() => {
        setTimeout(() => {
            if (!products.length){
                fetchProducts();
                fetchSupplier(_id);
            }

        }, 200)
        // fetchSupplier(_id)
    }, []);

    // ##### Event Handlers
    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        })
    }

    const onCancelErrorScreen = () =>{
        modal.closeAllModals();
        setTimeout(()=>{
            backTapped();
        },200)
    }

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = (tab) => {
        setEditableTab(tab)
        setEditMode(!isEditMode)
        if (!isEditMode === false) {
            console.log("Fields:", fields)

            // updatePhysicianFn(_id, fieldsObject)
        }
    }

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const backTapped = () => {
        navigation.navigate("Suppliers");
    }

    const handlePopovers = (popoverValue) => (popoverItem) => {

        if (!popoverItem) {
            let updatedPopovers = popoverList.map(item => {
                return {
                    ...item,
                    status: false
                }
            })

            setPopoverList(updatedPopovers)
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue };
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers)
        }

    }

    const onAddProducts = (item) => {
        console.log("DATA: ",)
        const newItem = {
            ...item,
            unitCost: item.unitPrice
        }
        setProducts([...products, newItem]);
    }

    // ##### Helper functions

    const errorScreen = () => {
        setTimeout(() => {
            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {false}
                            isError = {true}
                            onCancel = {onCancelErrorScreen}
                            message = "There was an issue performing this action."
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')}
                    })
        }, 100);
    }

    const fetchProducts = () => {
        setPageLoading(true);

        getSupplierProducts(_id, "")
            .then(productsData => {
                const { data = [], pages = 0 } = productsData
                setProducts(data)
                setHasFetchProducts(true)
            })
            .catch(error => {
                console.log("Failed to get products", error)
                //TODO handle error cases.
                errorScreen();
                //CONFORMATION SCREEN
            })
            .finally( _ => {
                setPageLoading(false);
            })
    };

    const fetchSupplier = (id) => {
        // setFetching(true);
        getSupplierById(id)
            .then(data => {
                console.log("Data: ", data)
                setSelectedSupplier(data)
            })
            .catch(error => {
                console.log("Failed to get supplier", error)
                if(hasFetchProducts === false){
                    setTimeout(()=>{modal.closeModals('ConfirmationModal');},100)
                    errorScreen();
                }

                // confirmation screeen
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false)
            })
    };

    // const supplierDetails = { supplier, status: '' }
    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <SupplierDetailsTab order={{supplier : selectedSupplier, status: ''}} />
            case "Products":
                return <SupplierProductsTab
                    floatingActions={floatingActions}
                    products={products}
                    onAddProducts={onAddProducts}
                    onProductsCreated={() => fetchProducts()}
                    supplierId={_id}
                />
            case "Purchase Orders":
                return <SupplierPurshaseOrders
                    floatingActions={floatingActions}
                    data = {selectedSupplier?.purchaseOrders}
                />;
            default:
                return <View />
        }
    };

    return (

        <>
            <PageContext.Provider value={{ pageState, setPageState }}>
                <DetailsPage
                    headerChildren={[name]}
                    onBackPress={backTapped}
                    pageTabs={
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={currentTab}
                            onPressChange={onTabPress}
                        />
                    }
                >

                    {getTabContent(currentTab)}

                </DetailsPage>
            </PageContext.Provider>
        </>

    );
}

SupplierPage.propTypes = {};
SupplierPage.defaultProps = {};

export default SupplierPage;

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
})

