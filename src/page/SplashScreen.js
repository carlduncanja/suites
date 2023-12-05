import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginBackground from "../components/Onboarding/LoginBackground";
import { restoreToken } from "../redux/actions/authActions";
import { connect } from "react-redux";
import { setBearerToken } from "../api";

function SplashScreen({ restoreToken }) {
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
        };

        bootstrapAsync();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <LoginBackground />
            </View>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
});

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = {
    restoreToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
