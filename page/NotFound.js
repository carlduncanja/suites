import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from "react-native";

function NotFound({descriptor}) {
    const {navigation} = descriptor;

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Page {navigation.state.routeName}</Text>
        </View>
    );
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default NotFound;
