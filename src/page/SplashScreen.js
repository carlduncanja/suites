import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ActivityIndicator, AsyncStorage} from "react-native"
import LoginBackground from "../components/Onboarding/LoginBackground";
import {setAuthData} from "../redux/actions/authActions";
import {connect} from 'react-redux'

function SplashScreen({auth, setAuthData, navigation}) {
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

            if (userToken) {
                const authData = {
                    ...auth,
                    userToken: userToken,
                    isLoading: false,
                }
                setAuthData(authData)
            }

            navigation.navigate(userToken ? "App" : "Auth")
        };

        bootstrapAsync();
    }, []);


    // useEffect(() => {
    //     if (auth) return;
    //
    //     console.log("auth data",auth)
    //
    //
    //     navigation.navigate(auth.userToken ? "App": "Auth")
    // }, [auth])


    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <LoginBackground/>
            </View>
            <ActivityIndicator size="large"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
})

SplashScreen.propTypes = {};
SplashScreen.defaultProps = {};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    setAuthData
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
