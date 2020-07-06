import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated
} from "react-native";
// import Animated from "react-native-reanimated";

const COLORS = ['rgba(255,255,255,1)', 'rgba(0,0,0,0.16)'];

/**
 * Long Press Listener component with feed back
 *
 * @param icon
 * @param title
 * @param touchable
 * @param disabled
 * @param onPress
 * @returns {*}
 * @constructor
 */
function ActionItem({icon, title, disabled, touchable = true, onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!touchable}
        >
            <View style={styles.container}>
                <View style={{marginRight: 13}}>
                    {icon}
                </View>
                <Text style={{color: disabled ? "#A0AEC0" : "#323843"}}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

ActionItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onPress: PropTypes.any.isRequired
};
ActionItem.defaultProps = {
    icon: <View/>,
    pressTimer: 700,
    disabled: false,
    onPress: () => {
        console.log("ACTION TRIGGERED")
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        minWidth: 200,
        padding: 6,
        borderRadius: 6
    },
    bgFill: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});

export default ActionItem;
