import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, StyleSheet} from "react-native";

function IconButton({Icon, onPress, disabled}) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                {Icon}
            </TouchableOpacity>
        </View>
    );
}

IconButton.propTypes = {};
IconButton.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default IconButton;
