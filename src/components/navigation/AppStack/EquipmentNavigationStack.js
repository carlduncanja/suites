import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Equipment from "../../../page/Equipment";
import EquipmentItemPage from "../../Equipment/EquipmentItemPage";
import EquipmentGroupDetailsPage from "../../../page/EquipmentGroupDetailsPage";
import AddEquipmentPage from "../../../page/AddEquipmentPage";
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
                name="AddEquipment"
                component={AddEquipmentPage}
                options={{
                    headerShown: false
                }}
            />


        </Stack.Navigator>
    );
}
