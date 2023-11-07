import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Invoices from '../../page/Invoices/Invoices'
import InvoicesPage from '../../page/Invoices/InvoicesPage';
const Stack = createStackNavigator();

export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;

    return (
        <Stack.Navigator
            initialRouteName="Invoices"
        >
            <Stack.Screen
                name="Invoices"
                component={Invoices}
                options={{
                    headerShown: false
                }}
                initialParams={{ isAdmin }}
            />

            <Stack.Screen
                name="InvoicesPage"
                component={InvoicesPage}
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
                initialParams={{ isAdmin }}
            />

        </Stack.Navigator>
    );
}