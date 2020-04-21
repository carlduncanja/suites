import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";

function CreateStorage(props) {
    return (
        <View style={styles.container}>
            <Text>HELLLOOO</Text>
        </View>
    );
}

CreateStorage.propTypes = {};
CreateStorage.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 4
    }
});

export default CreateStorage;
