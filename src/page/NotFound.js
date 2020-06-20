import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Button} from "react-native";
import AsyncStorage from "@react-native-community/async-storage"
import {connect} from "react-redux"
import {signOut} from "../redux/actions/authActions";

function NotFound({signOut}) {


    const handleOnLogout = async () => {
        await AsyncStorage.clear();
        signOut()
    };

    return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Page</Text>

            <Button style={{margin: 100}} onPress={handleOnLogout} title="LOGOUT"/>

        </View>
    );
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

const mapDispatcherToProps = {
    signOut
}

export default connect(null, mapDispatcherToProps)(NotFound);
