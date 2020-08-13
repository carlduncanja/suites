import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Orders from "../../../page/Orders";
import OrderItemPage from "../../PurchaseOrders/OrderItemPage";
import NotFound from "../../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();


export default () => {

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
            />

        </Stack.Navigator>
    );
}
