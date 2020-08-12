import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Procedures from "../../../page/Procedure/Procedures";
import CreateProcedure from "../../../page/Procedure/CreateProcedure";
import ProcedurePage from "../../../page/Procedure/ProcedurePage";
import NotFound from "../../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";
import PageHeader from "../../common/Page/PageHeader";


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
                options={({ route, navigation }) => ({
                    // headerShown: false
                    header: props =>
                        <PageHeader
                            headerMessage={route.params.procedure.name} specialDetail={` Dr. ${route.params.procedure.physician.firstName} ${route.params.procedure.physician.surname}`} isOpenEditable={route.params.isOpenEditable} onBack={() => navigation.navigate("Procedures")} {...props} />,
                    // headerLeft: (props) => (<HeaderBackComponent
                    //     {...props}
                    // />
                    // ),
                    headerStyle: {
                        height: 70,
                    },
                    headerTitle: ""
                })}
            />



        </Stack.Navigator>
    );
}
