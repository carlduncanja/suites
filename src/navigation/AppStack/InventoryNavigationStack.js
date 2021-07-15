import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Inventory from "../../page/Inventory/Inventory";
import InventoryPage from "../../page/Inventory/InventoryPage";
import InventoryVariantPage from "../../page/Inventory/InventoryVariantPage";
import CreateInventoryGroupDialogContainer from "../../components/Inventory/CreateInventoryGroupDialogContainer";
import CreateInventoryDialogContainer from "../../components/Inventory/CreateInventoryDialogContainer";
import NotFound from "../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";
import PageHeader from "../../components/common/Page/PageHeader";


const Stack = createStackNavigator();

export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;

    return (
        <Stack.Navigator
            initialRouteName="Inventory"
        >
            <Stack.Screen
                name="Inventory"
                component={Inventory}
                options={{
                    headerShown: false
                }}
                initialParams={{ isAdmin }}
            />


            <Stack.Screen
                name="InventoryPage"
                component={InventoryPage}
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
                name="InventoryVariantPage"
                component={InventoryVariantPage}
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
                name="CreateInventoryGroupDialogContainer"
                component={CreateInventoryGroupDialogContainer}
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
                name="CreateInventoryDialogContainer"
                component={CreateInventoryDialogContainer}
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
