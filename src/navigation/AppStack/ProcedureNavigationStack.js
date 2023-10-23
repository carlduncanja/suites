import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Procedures from "../../page/Procedure/Procedures";
import CreateProcedure from "../../page/Procedure/CreateProcedure";
import AddItems from "../../page/Procedure/AddItems";
import CreateCopy from "../../page/Procedure/CreateCopy";
import ProcedurePage from "../../page/Procedure/ProcedurePage";
import NotFound from "../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";
import PageHeader from "../../components/common/Page/PageHeader";


const Stack = createStackNavigator();


export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const procedurePermissions =props.route.params.userPermissions.procedures

    return (
        <Stack.Navigator
            initialRouteName="Procedures List"
        >
            <Stack.Screen
                name="Procedures List"
                component={Procedures}
                options={{
                    headerShown: false
                }}
                initialParams={{ isAdmin, procedurePermissions }}
            />

            <Stack.Screen
                name="CreateProcedure"
                component={CreateProcedure}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="AddItems"
                component={AddItems}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="CreateCopy"
                component={CreateCopy}
                options={{
                    // headerShown: false,
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
                options={({ route, navigation }) => ({
                    headerShown: false,
                    headerTitle: ""
                })}
                initialParams={{updatesProcedure : procedurePermissions.update}}
            />



        </Stack.Navigator>
    );
}
