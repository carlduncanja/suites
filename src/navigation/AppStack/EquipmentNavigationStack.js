import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Equipment from "../../page/Equipment/Equipment";
import EquipmentItemPage from "../../components/Equipment/EquipmentItemPage";
import EquipmentGroupDetailsPage from "../../page/Equipment/EquipmentGroupDetailsPage";
import AddEquipmentPage from "../../page/AddEquipmentPage";
import AssignEquipmentPage from "../../page/AssignEquipmentPage";
import AssignmentManagementPage from "../../page/AssignmentManagementPage";
import NotFound from "../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";

import AddCategoryDialog from "../../components/Equipment/AddCategoryDialog";

const Stack = createStackNavigator();


export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const equipmentPermissions =  props.route.params.userPermissions.equipment_type;

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
                initialParams={{ isAdmin, equipmentPermissions }}
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
                name="AssignmentManagementPage"
                component={AssignmentManagementPage}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="AddEquipmentCategory"
                component={AddCategoryDialog}
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

        </Stack.Navigator>
    );
}
