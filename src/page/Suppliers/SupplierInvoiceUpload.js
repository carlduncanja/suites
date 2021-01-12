import React, { useState, useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {PageContext} from '../../contexts/PageContext';

import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import { View, Text } from 'react-native';

const SupplierInvoiceUpload = ({ route }) => {
    const navigation = useNavigation();
    const tabs = ['Details'];
    const { invoiceItem = {}, selectedSupplierName = '' } = route.params;
    const [pageState, setPageState] = useState({});

    const {isEditMode} = pageState;
    return (
        <>
            <PageContext.Provider value={{pageState, setPageState}}>
                <DetailsPage
                    title={selectedSupplierName}
                    subTitle={invoiceItem.invoiceNumber}
                    onBackPress={() => navigation.goBack()}
                    pageTabs={(
                        <TabsContainer
                            tabs={tabs}
                            selectedTab="Details"
                        />
                    )}
                >

                    <View>
                        <Text>Upload</Text>
                    </View>

                </DetailsPage>
            </PageContext.Provider>
        </>
    );
};

export default SupplierInvoiceUpload;
