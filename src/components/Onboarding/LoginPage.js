import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert, AsyncStorage} from "react-native";
import LoginComponent from "./LoginComponent";
import {login} from "../../api/network";
import {SuitesContextProvider} from "../../contexts/SuitesContext";

function LoginPage({navigation}) {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    }
    const onButtonPress = () => {
        console.log("Fields: ", fields)
        login(fields.email, fields.password)
            .then(async data => {
                // save auth data
                console.log(data)
                try {
                    await AsyncStorage.setItem('userToken', data.token);
                    navigation.navigate("App")
                } catch (error) {
                    // Error saving data
                }
            })
            .catch(e => {
                console.log("login failed", e);
                Alert.alert("Failed to login");
            })
    }


    const onGuestButtonPress = () => {
    }

    return (
        <View style={styles.container}>
            <LoginComponent
                fields={fields}
                onFieldChange={onFieldChange}
                onButtonPress={onButtonPress}
                onGuestButtonPress={onGuestButtonPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

LoginPage.propTypes = {};
LoginPage.defaultProps = {};

export default LoginPage;
