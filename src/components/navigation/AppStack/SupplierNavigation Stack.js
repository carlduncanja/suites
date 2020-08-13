import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Suppliers from "../../../page/Suppliers";
import SupplierPage from "../../Suppliers/SupplierPage";
import NotFound from "../../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();


export default () => {

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

        </Stack.Navigator>
    );
}
