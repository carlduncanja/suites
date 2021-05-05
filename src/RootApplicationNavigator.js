import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";

import AuthStack from "../src/components/navigation/AuthStack/AuthStack";
import {connect} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import SuitesNavigationStack from "./components/navigation/AppStack/SuitesNavigationStack";

const Stack = createStackNavigator();

function RootApplicationNavigator({auth}) {
    const {
        isSignOut,
        userToken,
    } = auth;

    useEffect(() => {
        console.log("auth updated", auth);

    }, [auth])

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


export default connect(mapStateToProps)(RootApplicationNavigator)
