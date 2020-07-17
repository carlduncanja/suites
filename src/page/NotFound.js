import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Button} from "react-native";
import AsyncStorage from "@react-native-community/async-storage"
import {connect} from "react-redux"
import {signOut} from "../redux/actions/authActions";
import { useTheme } from 'emotion-theming'

function NotFound({signOut, route = {}}) {
    const {name = ""} = route;
    const theme = useTheme()
    console.log("Theme: ", theme)

    const handleOnLogout = async () => {
        await AsyncStorage.clear();
        signOut()
    };

    return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{margin: 50}}> {name} Page Not Found</Text>

            <Button onPress={handleOnLogout} title="LOGOUT"/>
        </View>
    );
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

const mapDispatcherToProps = {
    signOut
}

export default connect(null, mapDispatcherToProps)(NotFound);
