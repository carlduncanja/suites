import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, StyleSheet} from "react-native";

function IconButton({Icon, onPress, disabled}) {
    return (
        <TouchableOpacity onPress={onPress} style={{padding: 10}}>
            {Icon}
        </TouchableOpacity>
    );
}

IconButton.propTypes = {};
IconButton.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default IconButton;
