import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Suppliers from "../../../page/Suppliers";
import SupplierPage from "../../../page/Suppliers/SupplierPage";
import NotFound from "../../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";
import ArchivedSuppliers from "../../../page/ArchivedSuppliers/ArchivedSuppliersPage";
import ArchivedSupplier from "../../../page/ArchivedSuppliers/ArchivedSupplier";
import SupplierProductPage from "../../../page/Suppliers/SupplierProductPage";
import SupplierProductCreationPage from "../../../page/Suppliers/SupplierProductCreationPage";


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
                    headerTitle: ""
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
                    headerTitle: ""
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
                    headerTitle: ""
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
                    headerTitle: ""
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
                    headerTitle: ""
                }}
            />

        </Stack.Navigator>
    );
}
