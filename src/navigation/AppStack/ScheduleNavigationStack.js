import React, { useEffect, useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';

import SchedulePage from "../../page/Schedule/SchedulePage/SchedulePage";
import PrintSchedulePage from "../../page/Schedule/PrintSchedule/PrintSchedulePage";
import { getUserCall } from "../../api/network";

const Stack = createStackNavigator();

export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const userPermissions = props.route.params.userPermissions 
    const id = props.route.params.id;

    console.log("we are them ",userPermissions)
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
                initialParams={ { id} }
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
