import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import SupplierDetailsTab from '../OverlayTabs/SupplierDetailsTab';
import SupplierProductsTab from '../OverlayTabs/SupplierProductsTab';
import SupplierPurshaseOrders from '../OverlayTabs/SupplierPurchaseOrders';
import BottomSheetContainer from '../common/BottomSheetContainer';
import {PageContext} from "../../contexts/PageContext";
import DetailsPage from "../common/DetailsPage/DetailsPage";
import TabsContainer from "../common/Tabs/TabsContainerComponent";
import ConfirmationComponent from '../ConfirmationComponent';


import {getSupplierById, createPurchaseOrder, getSupplierProducts} from "../../api/network";
import {colors} from "../../styles";
import {useModal} from 'react-native-modalfy';
import {set} from 'numeral';
import SupplierProductsDetailsTab from "../OverlayTabs/SupplierProductsDetailsTab";


function SupplierProductPage({route, navigation}) {
    const {product : defaultProduct = {}, onUpdated} = route?.params || {};
    const modal = useModal();

    const currentTabs = ["Details"];

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [pageState, setPageState] = useState({});
    const [product, setProduct] = useState(defaultProduct);

    const {isEditMode} = pageState;

    // ##### Lifecycle Methods


    // ##### Event Handlers

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const backTapped = () => {
        navigation.goBack();
    }

    const onValueUpdate = (product) => {
        const updatedValue = {...defaultProduct,...product};
        setProduct(updatedValue);
        onUpdated(updatedValue);
    }


    // ##### Helper functions

    // const supplierDetails = { supplier, status: '' }
    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <SupplierProductsDetailsTab
                    supplierId={supplier?._id}
                    product={product}
                    isEdit={isEditMode}
                    onUpdate={onValueUpdate}
                />
            default:
                return <View/>
        }
    };


    const {
        name = "",
        _id = "",
        supplier = {}
    } = product;

    return (
        <>
            <PageContext.Provider value={{pageState, setPageState}}>
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

