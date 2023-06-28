import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Orders from "../../page/PurchaseOrders/Orders";
import OrderItemPage from "../../page/PurchaseOrders/OrderItemPage";
import NotFound from "../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();


export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const purchaseOrderPermissions=props.route.params.userPermissions.purchase_orders

    return (
        <Stack.Navigator
            initialRouteName="Orders"
        >
            <Stack.Screen
                name="Orders"
                component={Orders}
                options={{
                    headerShown: false
                }}
                initialParams={{ 
                    isAdmin ,
                    purchaseOrderPermissions
                }}
            />


            <Stack.Screen
                name="OrderItemPage"
                component={OrderItemPage}
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
                initialParams={{
                    purchaseOrderPermissions
                }}
            />

        </Stack.Navigator>
    );
}
