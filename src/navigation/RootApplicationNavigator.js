import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import AuthStack from "./AuthStack/AuthStack";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import SuitesNavigationStack from "./AppStack/SuitesNavigationStack";
import { restoreToken } from "../redux/actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setBearerToken } from "../api";

const Stack = createStackNavigator();

function RootApplicationNavigator({ auth, restoreToken }) {
    const { isSignOut, userToken } = auth;

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem("userToken");
            } catch (e) {
                console.log("failed to get tokens");
            }

            if (userToken) {
                setBearerToken(userToken);
            }

            restoreToken(userToken);

            try {
                await SplashScreen.hideAsync();
            } catch (e) {
                console.log("Failed to hide splash screen", error);
            }
        };

        bootstrapAsync();
    }, []);

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
