import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack/AuthStack";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import SuitesNavigationStack from "./AppStack/SuitesNavigationStack";
import { restoreToken } from "../redux/actions/authActions";

const Stack = createStackNavigator();

function RootApplicationNavigator({ auth }) {
    const { isSignOut, userToken } = auth;

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        gestureEnabled: true,
                        headerShown: false,
                    }}
                >
                    {userToken === null ? (
                        <Stack.Screen
                            name="Auth"
                            component={AuthStack}
                            options={{
                                headerShown: false,
                            }}
                        />
                    ) : (
                        <Stack.Screen
                            name="App"
                            component={SuitesNavigationStack}
                            options={{
                                headerShown: false,
                                animationTypeForReplace: isSignOut
                                    ? "pop"
                                    : "push",
                            }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = {
    restoreToken,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scroll: {
        flex: 1,
        flexDirection: "row",
    },
    sidebar: {
        width: "7%",
    },
    content: {
        flex: 12,
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootApplicationNavigator);
