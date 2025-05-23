import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PatientFiles from "../../page/Patients/PatientFiles";
import CreateCasePage from "../../page/CaseFile/CreateCasePage";
import AddProcedurePage from "../../page/Patients/AddProcedurePage";
import PatientPage from "../../page/Patients/PatientPage";
const Stack = createStackNavigator();

export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const permissions = props.route.params.userPermissions;

    return (
        <Stack.Navigator initialRouteName="Patients">
            <Stack.Screen
                name="Patients"
                component={PatientFiles}
                options={{
                    headerShown: false,
                }}
                initialParams={{
                    isAdmin,
                    permissions,
                }}
            />
            <Stack.Screen
                name="PatientCreation"
                component={CreateCasePage}
                options={{
                    headerShown: false,
                }}
                initialParams={{
                    isAdmin,
                    permissions,
                }}
            />

            <Stack.Screen
                name="patient"
                component={PatientPage}
                options={{
                    headerShown: false,
                    headerStyle: {
                        height: 100,
                    },
                    headerTitle: "",
                }}
                initialParams={{ permissions }}
            />
            <Stack.Screen
                name="AddProcedure"
                component={AddProcedurePage}
                options={{
                    headerShown: false,
                }}
                initialParams={{
                    isAdmin,
                    permissions,
                }}
            />
        </Stack.Navigator>
    );
};
