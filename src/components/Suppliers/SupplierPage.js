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


import { getSupplierById, createPurchaseOrder, getSupplierProducts } from "../../api/network";
import { colors } from "../../styles";


function SupplierPage({ route, navigation }) {
    const { supplier, isOpenEditable, floatingActions } = route.params;
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
    // const [cartOrderItems, setCartOrderItems] = useState([])
    const [products, setProducts] = useState([])

    const [fields, setFields] = useState({})
    const [popoverList, setPopoverList] = useState([])

    // ##### Lifecycle Methods
    useEffect(() => {
        setTimeout(() => {
            if (!products.length) fetchProducts()
        }, 200)
        // fetchSupplier(_id)
    }, []);

    // useEffect(() => {
    //     if (!products.length) fetchProducts()
    //     // setTotalPages(Math.ceil(products.length / recordsPerPage))
    // }, []);

    // ##### Event Handlers
    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        })
    }


    const fetchProducts = () => {
        setPageLoading(true);
        getSupplierProducts(_id, "")
            .then(productsData => {
                const { data = [], pages = 0 } = productsData
                setProducts(data)
                // console.log("Products data: ", data)
                // setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log("Failed to get products", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false);
            })
    };

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
        setProducts([...products, newItem])

    }

    // ##### Helper functions

    const fetchSupplier = (id) => {
        setFetching(true);
        getSupplierById(id)
            .then(data => {
                setSelectedSupplier(data)
            })
            .catch(error => {
                console.log("Failed to get supplier", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    const supplierDetails = { supplier, status: '' }

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <SupplierDetailsTab order={supplierDetails} />
            case "Products":
                return <SupplierProductsTab
                    floatingActions={floatingActions}
                    products={products}
                    onAddProducts={onAddProducts}
                    // cartOrderItems = {cartOrderItems}
                    supplierId={_id}
                />
            case "Purchase Orders":
                return <SupplierPurshaseOrders
                    floatingActions={floatingActions}
                />;
            default:
                return <View />
        }
    };

    return (

        // <BottomSheetContainer
        //     isFetching={isFetching}
        //     overlayId={supplierNumber}
        //     overlayTitle={name}
        //     onTabPressChange={onTabPress}
        //     currentTabs={currentTabs}
        //     selectedTab={currentTab}
        //     isEditMode={isEditMode}
        //     onEditPress={onEditPress}
        //     overlayContent={getTabContent(currentTab)}
        // />

        <>
            <PageContext.Provider value={{ pageState, setPageState }}>
                <DetailsPage
                    title={name}
                    subTitle={``}
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
        // <View style={{flex: 1}}>
        //     {
        //         isFetching
        //             ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
        //                 <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
        //             </View>
        //             :

        //             // console.log("Selected: ", selectedProcedure)
        //             <SlideOverlay
        //                 overlayId={supplierNumber}
        //                 overlayTitle={name}
        //                 onTabPressChange={onTabPress}
        //                 currentTabs={currentTabs}
        //                 selectedTab={currentTab}
        //                 isEditMode={isEditMode}
        //                 onEditPress = {onEditPress}
        //                 overlayContent={
        //                     <View 
        //                         style={{flex: 1, padding:30, paddingBottom:20}}
        //                         // onPress = {()=>{console.log("Touched"); handlePopovers(false)()}}
        //                     >
        //                         {getTabContent(currentTab)}
        //                     </View>
        //                 }
        //             />
        //     }
        // </View>
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

