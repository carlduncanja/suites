import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';


import AuthStack from "../src/components/navigation/AuthStack/AuthStack";
import {connect} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import SuitesNavigationStack from "./components/navigation/AppStack/SuitesNavigationStack";
import {restoreToken} from "./redux/actions/authActions";
import AsyncStorage from "@react-native-community/async-storage";
import {setBearerToken} from "./api";

const Stack = createStackNavigator();

function RootApplicationNavigator({auth, restoreToken}) {
    const {
        isSignOut,
        userToken,
    } = auth;

    useEffect(() => {
        console.log("auth updated", auth);

    }, [auth])

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
                // TODO clear app data
                console.log("failed to get tokens")
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.

            console.log('setting user token', userToken);

            if (userToken) {
                setBearerToken(userToken)
            }

            restoreToken(userToken);

            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // waiting a second for token to be persisted.
                await SplashScreen.hideAsync();
            } catch (e) {
                console.log('Failed to hide splash screen', error);
            }
        };

        bootstrapAsync().then();
    }, []);

    return (
        <View style={styles.container}>

            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        gestureEnabled: true,
                        headerShown: false
                    }}
                >

                    {
                        userToken === null
                            ? <Stack.Screen
                                name="Auth"
                                component={AuthStack}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            : <Stack.Screen
                                name="App"
                                component={SuitesNavigationStack}
                                options={{
                                    headerShown: false,
                                    // When logging out, a pop animation feels intuitive
                                    // You can remove this if you want the default 'push' animation
                                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                                }}
                            />
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

RootApplicationNavigator.propTypes = {};
RootApplicationNavigator.defaultProps = {};


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}


const mapDispatchToProps = {
    restoreToken
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        //flex:1,
        width: '7%'
    },
    content: {
        flex: 12,
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(RootApplicationNavigator)
