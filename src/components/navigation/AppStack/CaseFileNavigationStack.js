import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import CaseFiles from "../../../page/CaseFile/CaseFiles";
import NotFound from "../../../page/NotFound";
import CreateCasePage from "../../../page/CaseFile/CreateCasePage";
import HeaderBackComponent from "../components/HeaderBackComponent";
import CasePage from "../../../page/CaseFile/CasePage";

const Stack = createStackNavigator();


export default () => {

    return (
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
                component={CreateCasePage}
                options={{
                    // headerShown: false
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
                name="Case"
                component={CasePage}
                options={{
                    // headerShown: false
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
