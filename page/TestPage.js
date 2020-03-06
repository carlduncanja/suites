import React from 'react';
import PropTypes from 'prop-types';
import {Text} from "react-native";

function TestPage({descriptor}) {
    const {navigation} = descriptor;

    return (
        <Text>Page {navigation.state.routeName}</Text>
    );
}

TestPage.propTypes = {};
TestPage.defaultProps = {};

export default TestPage;
