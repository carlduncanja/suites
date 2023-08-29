import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import PatientFiles from "../../page/Patients/PatientFiles";
//import PatientCreationPage from "../../page/Patients/PatientCreation/PatientCreationPage"; 
import CreateCasePage from "../../page/CaseFile/CreateCasePage";
const Stack = createStackNavigator();


export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const permissions = null

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

        </Stack.Navigator>
    )
}