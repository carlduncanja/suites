import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useModal } from 'react-native-modalfy';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';


function InvoicesPage({ route, navigation }) {
    const {invoiceItem, isOpenEditable, updateInvoices} = route.params;
    const baseStateRef = useRef();
    const modal = useModal();

    const currentTabs = ['Details', 'Items', 'Suppliers','Images'];

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedInvoice, setSelectedInvoice] = useState({});
    const [invoiceItems, setInvoiceItemsItems] = useState([]);
    const [pageState, setPageState] = useState({});
    const [isUpdateDone, setIsUpdateDone] = useState(false);
    const [isUpdateDescription, setIsUpdateDescription] = useState(false);
    const { isEditMode } = pageState;

    const { _id, supplier = {}, invoiceNumber, deliveryDate = '', description = '' } = invoiceItem;
    const { name = '' } = supplier;


    return (
        <>
            <PageContext.Provider value={{pageState, setPageState}}>
                <DetailsPage
                    headerChildren={[invoiceNumber]}
                    pageTabs={
                        <TabsContainer tabs={currentTab} selectedTab={currentTab} >
                            
                        </TabsContainer>
                    }
                >

                </DetailsPage>
            </PageContext.Provider>
        </>
    );
}

export default InvoicesPage;