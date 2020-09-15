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
import SupplierProductsDetailsTab from "../OverlayTabs/SupplierProductsDetailsTab";


function SupplierProductPage({ route, navigation }) {
    const { product = {}, isOpenEditable, floatingActions } = route?.params || {};
    const modal = useModal();



    const currentTabs = ["Details"];
    const {
        name = "",
        _id = "",
        supplier = {}
    } = product;

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

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const backTapped = () => {
        navigation.goBack();
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


    // const supplierDetails = { supplier, status: '' }
    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <SupplierProductsDetailsTab product={product}/>
            default:
                return <View />
        }
    };

    return (
        <>
            <PageContext.Provider value={{ pageState, setPageState }}>
                <DetailsPage
                    headerChildren={[supplier?.name, "products", name]}
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

SupplierProductPage.propTypes = {};
SupplierProductPage.defaultProps = {};

export default SupplierProductPage;

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
})

