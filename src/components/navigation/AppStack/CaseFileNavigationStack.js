import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import CaseFiles from "../../../page/CaseFiles";
import NotFound from "../../../page/NotFound";

const Stack = createStackNavigator();


export default () => (
    <Stack.Navigator
        initialRouteName="CaseFiles"
    >
        <Stack.Screen
            name="CaseFiles"
            component={CaseFiles}
            options={{
                headerShown: false
            }}
        />

        <Stack.Screen
            name="CreateCase"
            component={NotFound}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
);
