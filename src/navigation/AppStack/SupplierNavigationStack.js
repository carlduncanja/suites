import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Suppliers from '../../page/Suppliers';
import SupplierPage from '../../page/Suppliers/SupplierPage';
import SupplierInvoiceUpload from '../../page/Suppliers/SupplierInvoiceUpload';
import NotFound from '../../page/NotFound';
import HeaderBackComponent from '../components/HeaderBackComponent';
import ArchivedSuppliers from '../../page/ArchivedSuppliers/ArchivedSuppliersPage';
import ArchivedSupplier from '../../page/ArchivedSuppliers/ArchivedSupplier';
import SupplierProductPage from '../../page/Suppliers/SupplierProductPage';
import SupplierProductCreationPage from '../../page/Suppliers/SupplierProductCreationPage';
import Orders from '../../page/PurchaseOrders/Orders';

const Stack = createStackNavigator();

export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;

    return (
        <Stack.Navigator
            initialRouteName="Suppliers"
        >
            <Stack.Screen
                name="Suppliers"
                component={Suppliers}
                options={{
                    headerShown: false
                }}
                initialParams={{ isAdmin }}
            />


            <Stack.Screen
                name="SupplierPage"
                component={SupplierPage}
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackComponent
                            {...props}
                        />
                    ),
                    headerStyle: {
                        height: 100,

                    },
                    headerTitle: ''
                }}
            />

            <Stack.Screen
                name="SupplierProductPage"
                component={SupplierProductPage}
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackComponent
                            {...props}
                        />
                    ),
                    headerStyle: {
                        height: 100,

                    },
                    headerTitle: ''
                }}
            />

            <Stack.Screen
                name="SupplierProductCreation"
                component={SupplierProductCreationPage}
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackComponent
                            {...props}
                        />
                    ),
                    headerStyle: {
                        height: 100,

                    },
                    headerTitle: ''
                }}
            />

            <Stack.Screen
                name="ArchivedSuppliers"
                component={ArchivedSuppliers}
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackComponent
                            {...props}
                        />
                    ),
                    headerStyle: {
                        height: 100,

                    },
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name="ArchivedSupplier"
                component={ArchivedSupplier}
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackComponent
                            {...props}
                        />
                    ),
                    headerStyle: {
                        height: 100,

                    },
                    headerTitle: ''
                }}
            />

            <Stack.Screen
                name="SupplierInvoiceUpload"
                component={SupplierInvoiceUpload}
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackComponent
                            {...props}
                        />
                    ),
                    headerStyle: {
                        height: 100,

                    },
                    headerTitle: ''
                }}
            />

            <Stack.Screen
                name="purchase-order"
                component={Orders}
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackComponent
                            {...props}
                        />
                    ),
                    headerStyle: {
                        height: 100,

                    },
                    headerTitle: ''
                }}
            />

            </Stack.Navigator>
    );
};
