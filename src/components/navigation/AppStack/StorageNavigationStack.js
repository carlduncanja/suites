import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Storage from "../../../page/Storage";
import StoragePage from "../../Storage/StoragePage";
import NotFound from "../../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();


export default () => {

    return (
        <Stack.Navigator
            initialRouteName="Storage"
        >
            <Stack.Screen
                name="Storage"
                component={Storage}
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name="StoragePage"
                component={StoragePage}
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
