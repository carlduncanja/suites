import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useModal } from 'react-native-modalfy';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import InvoiceDetailsTab from '../../components/OverlayTabs/InvoiceDetailsTab';
import InvoiceItemTab from '../../components/OverlayTabs/InvoiceItemTab'
import SupplierDetailsTab from '../../components/OverlayTabs/SupplierDetailsTab';

function InvoicesPage({ route, navigation }) {
    const {invoiceItem, isOpenEditable, updateInvoices} = route.params;
    const baseStateRef = useRef();
    const modal = useModal();

    const currentTabs = ['Details', 'Items', 'Suppliers','Images'];

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedInvoice, setSelectedInvoice] = useState({});
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [pageState, setPageState] = useState({});
    const [isUpdateDone, setIsUpdateDone] = useState(false);
    const [isUpdateDescription, setIsUpdateDescription] = useState(false);
    const { isEditMode } = pageState;

    const { _id, supplier = {}, invoiceNumber, deliveryDate = '', description = '' } = invoiceItem;
    const { name = '' } = supplier;
    
    const BackTapped =() =>{
        navigation.goBack("Invoice")
    }
    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    }; 
    
    useEffect(() => {
        setTimeout(() => fetchInvoice(_id) , 200);
    }, []);
    
    useEffect(() => {

        if (pageState.isEditMode) {
            baseStateRef.current = orderItems // save the base state for as we enter edit mode.
        }

        if (pageState.isEditMode === false && isUpdateDone) {
            handleSaveEdit();
            setIsUpdateDone(false);
        }
    }, [pageState.isEditMode]) 
    
    const fetchInvoice = async (id) => { 
        //console.log("Gaza",invoiceItem) 
        const {invoice =[]}=invoiceItem || {};
        setSelectedInvoice(invoiceItem)
        setInvoiceItems(invoice)
        console.log("Gaza",invoice) 
        /*setPageLoading(true);
        getPurchaseOrderById(id)
            .then(data => {
                const { orders = [] } = data || {};
                //setSelectedInvoice(data)
                //setInvoiceItems(orders)
            })
            .catch(error => {
                console.log('Failed to get invoice', error)
                errorScreen();

                // Add confirmation componenet
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false)
            })*/
    };
    
    const getTabContent = (selectedTab)=>{
         switch(selectedTab){
            case 'Detials' :
                return <InvoiceDetailsTab
                invoice={selectedInvoice}
                /> 
            case 'Items':
                return <InvoiceItemTab
                    invoice={orderItems}
                    isEditMode={()=>console.log("")}
                    onItemChange={()=>console.log("")}
                    supplierId={()=>console.log("")}
                    onAddProductItems={()=>console.log("")}
                    onRemoveProductItems={()=>console.log("")}
                />; 
            case 'Suppliers': 
             return <SupplierDetailsTab supplierId={supplier?._id} order={selectedInvoice} onUpdated={()=>console.log("gaza")} />; 
            
             default:
                return <View />;
         }
    }
    
    return (
        <>
            <PageContext.Provider value={{pageState, setPageState}}>
                <DetailsPage
                    headerChildren={[invoiceNumber]}
                    onBackPress={BackTapped}
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

export default InvoicesPage;