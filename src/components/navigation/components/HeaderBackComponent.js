import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

function HeaderBackComponent({onPress, label}) {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.backText}> Back to {label} </Text>
        </TouchableOpacity>
    );
}

HeaderBackComponent.propTypes = {};
HeaderBackComponent.defaultProps = {};

export default HeaderBackComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E3E8EF",
        borderRadius: 6,
        padding: 14,
        paddingTop: 4,
        paddingBottom: 4,
        marginLeft: 16,
    },
    backText: {
        color: '#4E5664'
    }
})
