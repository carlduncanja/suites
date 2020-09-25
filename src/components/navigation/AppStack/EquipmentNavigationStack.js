import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Equipment from "../../../page/Equipment/Equipment";
import EquipmentItemPage from "../../Equipment/EquipmentItemPage";
import EquipmentGroupDetailsPage from "../../../page/Equipment/EquipmentGroupDetailsPage";
import AddEquipmentPage from "../../../page/AddEquipmentPage";
import AssignEquipmentPage from "../../../page/AssignEquipmentPage";
import AssignmentManagmentPage from "../../../page/AssignmentManagementPage";
import NotFound from "../../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();


export default () => {

    return (
        <Stack.Navigator
            initialRouteName="Equipment"
        >
            <Stack.Screen
                name="Equipment"
                component={Equipment}
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name="EquipmentItemPage"
                component={EquipmentItemPage}
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
            />
            <Stack.Screen
                name="EquipmentGroupDetailsPage"
                component={EquipmentGroupDetailsPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AddEquipmentPage"
                component={AddEquipmentPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AssignEquipmentPage"
                component={AssignEquipmentPage}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AssignmentManagmentPage"
                component={AssignmentManagmentPage}
                options={{
                    headerShown: false
                }}
            />


        </Stack.Navigator>
    );
}
