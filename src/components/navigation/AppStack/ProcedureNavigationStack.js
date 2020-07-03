import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import Procedures from "../../../page/Procedure/Procedures";
import CreateProcedure from "../../../page/Procedure/CreateProcedure";
import ProcedurePage from "../../../page/Procedure/ProcedurePage";
import NotFound from "../../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();


export default () => {

    return (
        <Stack.Navigator
            initialRouteName="Procedures" 
        >
            <Stack.Screen
                name="Procedures"
                component={Procedures}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="CreateProcedure"
                component={CreateProcedure}
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
                name="Procedure"
                component={ProcedurePage}
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
