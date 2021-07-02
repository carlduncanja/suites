import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import SchedulePage from "../../page/Schedule/SchedulePage";
import PrintSchedulePage from "../../page/Schedule/PrintSchedulePage";

const Stack = createStackNavigator();

export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;

    return (
        <Stack.Navigator
            initialRouteName="SchedulePage"
        >
            <Stack.Screen
                name="SchedulePage"
                component={SchedulePage}
                options={{
                    headerShown: false
                }}
                initialParams={{ isAdmin }}
            />

            <Stack.Screen
                name="PrintSchedulePage"
                component={PrintSchedulePage}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    );
}
