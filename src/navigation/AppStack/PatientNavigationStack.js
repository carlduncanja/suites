import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import PatientFiles from "../../page/Patients/PatientFiles";
//import PatientCreationPage from "../../page/Patients/PatientCreation/PatientCreationPage"; 
import CreateCasePage from "../../page/CaseFile/CreateCasePage";
import CasePage from "../../page/CaseFile/CasePage";
import HeaderBackComponent from "../components/HeaderBackComponent";
import PatientPage from "../../page/Patients/PatientPage";
const Stack = createStackNavigator();


export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const permissions = props.route.params.userPermissions

    return (
        <Stack.Navigator
            initialRouteName="PatientFiles"
        >

            <Stack.Screen
                name="PatientFiles" 
                
                component={PatientFiles}
                options={{
                    headerShown: false
                }}
                initialParams={{
                    isAdmin,
                    permissions
                }}
            />
            <Stack.Screen
                name="PatientCreation"
                component={CreateCasePage}
                options={{
                    headerShown: false
                }}
                initialParams={{
                    isAdmin,
                    permissions
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
                    headerTitle: ""
                }}
                initialParams={{permissions}}
            />


        </Stack.Navigator>
    )
}