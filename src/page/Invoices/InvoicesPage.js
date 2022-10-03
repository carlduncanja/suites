import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { PageContext } from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import InvoiceDetailsTab from '../../components/OverlayTabs/InvoiceDetailsTab';
import InvoiceItemTab from '../../components/OverlayTabs/InvoiceItemTab'
import SupplierDetailsTab from '../../components/OverlayTabs/SupplierDetailsTab';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { getInvoiceById } from '../../api/network';

function InvoicesPage({ route, navigation }) {
    const { invoiceItem, isOpenEditable, updateInvoices } = route.params;
    const baseStateRef = useRef();
    const modal = useModal();

    const currentTabs = ['Details', 'Items', 'Suppliers', 'Images'];

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedInvoice, setSelectedInvoice] = useState({});
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [pageState, setPageState] = useState({});
    const [isUpdateDone, setIsUpdateDone] = useState(false);
    const [isUpdateDescription, setIsUpdateDescription] = useState(false);
    const { isEditMode } = pageState;

    const { _id, supplier = {}, invoiceNumber, deliveryDate = '', description = '' ,image=''} = invoiceItem;
    const { name = '' } = supplier;

    const BackTapped = () => {
        navigation.goBack("Invoice")
    }
    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    useEffect(() => {
        setTimeout(() => fetchInvoice(_id), 200);
    }, []);

    useEffect(() => {

        if (pageState.isEditMode) {
            baseStateRef.current = invoiceItem // save the base state for as we enter edit mode.
        }

        if (pageState.isEditMode === false && isUpdateDone) {
            handleSaveEdit();
            setIsUpdateDone(false);
        }
    }, [pageState.isEditMode])

    const fetchInvoice = async (id) => {

        setPageLoading(true);
        getInvoiceById(id)
            .then(data => {

                const { invoices = [] } = data || {};
                setSelectedInvoice(data)
                setInvoiceItems(invoices)

            })
            .catch(error => {
                console.log('Failed to get invoice', error)
                errorScreen();
            })
            .finally(_ => {
                setPageLoading(false)
            })
    };

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
                        />
                        ,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal')
                        }
                    })
        }, 100);
    };

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        })
    }

    const onCancelErrorScreen = () => {
        modal.closeAllModals();
        setTimeout(() => {
            BackTapped();
        }, 200)
    }

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case 'Details':
                return <InvoiceDetailsTab
                    invoice={selectedInvoice}
                    onUpdate={() => fetchInvoice(_id)}
                />
            case 'Items':
                return <InvoiceItemTab
                    invoice={invoiceItem}
                    isEditMode={() => console.log("")}
                    onItemChange={() => console.log("")}
                    supplierId={() => console.log("")}
                    onAddProductItems={() => console.log("")}
                    onRemoveProductItems={() => console.log("")}
                />;
            case 'Suppliers':
                return <SupplierDetailsTab supplierId={supplier?._id} order={selectedInvoice} onUpdated={() => fetchInvoice(_id)} />;

            case 'Image':
                <View style={styles.container}>
                    <Image
                       source={{uri:image}}
                    />
                </View>
            default:
                return <View />;
        }
    }

    return (
        <>
            <PageContext.Provider value={{ pageState, setPageState }}>
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