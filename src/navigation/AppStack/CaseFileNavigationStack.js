import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import CaseFiles from "../../page/CaseFile/CaseFiles";
import AddAppointmentPage from "../../page/CaseFile/AddAppointmentPage";
import AddChargeSheetItem from "../../page/CaseFile/AddChargeSheetItem";
import ArchiveCasesPage from "../../page/CaseFile/ArchiveCasesPage";
import NotFound from "../../page/NotFound";
import CreateCasePage from "../../page/CaseFile/CreateCasePage";
import HeaderBackComponent from "../components/HeaderBackComponent";
import CasePage from "../../page/CaseFile/CasePage";

const Stack = createStackNavigator();

export default (props) => {
    const isAdmin = props.route.params.isAdmin || false; 
    const permissions = props.route.params.userPermissions.cases 
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
                initialParams={{ 
                    isAdmin,
                    permissions
                }}
            />

            <Stack.Screen
                name="CreateCase"
                component={CreateCasePage}
                options={{
                    headerShown: false,
                    // headerLeft: (props) => (
                    //     <HeaderBackComponent
                    //         {...props}
                    //     />
                    // ),
                    // headerStyle: {
                    //     height: 100,
                    // },
                    // headerTitle: ""
                }} 
                initialParams={{
                    intialPage:" "
                }}
            />

            <Stack.Screen
                name="Case"
                component={CasePage}
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
                initialParams={{permissions}}
            />
            <Stack.Screen
                name="AddAppointmentPage"
                component={AddAppointmentPage}
                options={{
                    headerShown: false,
                    // headerLeft: (props) => (
                    //     <HeaderBackComponent
                    //         {...props}
                    //     />
                    // ),
                    // headerStyle: {
                    //     height: 100,
                    //
                    // },
                    // headerTitle: ""
                }}
            />

            <Stack.Screen
                name="AddChargeSheetItem"
                component={AddChargeSheetItem}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="ArchiveCasesPage"
                component={ArchiveCasesPage}
                options={{
                    headerShown: false,
                }}
            />


        </Stack.Navigator>
    );
}
