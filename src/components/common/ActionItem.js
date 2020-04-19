import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    Animated
} from "react-native";
// import Animated from "react-native-reanimated";

const COLORS = ['rgba(255,255,255,1)', 'rgba(0,0,0,0.16)'];

/**
 * Long Press Listener component with feed back
 *
 * Inspired from : https://codedaily.io/tutorials/24/React-Native-Press-and-Hold-Button-Actions
 *
 * @param icon
 * @param title
 * @param pressTimer
 * @param isDisabled
 * @param onLongPress
 * @returns {*}
 * @constructor
 */
function ActionItem({icon, title, pressTimer, isDisabled, onLongPress}) {

    const _valueRef = useRef(0);
    const ACTION_TIMER = pressTimer || 700;


    const [pressAction] = useState(new Animated.Value(0));
    const [buttonWidth, setButtonWidth] = useState(0);
    const [buttonHeight, setButtonHeight] = useState(0);

    useEffect(() => {
        pressAction.addListener((v) => {
            _valueRef.current = v.value;

            if (v.value === 1) {
                onLongPress();
            }
        });
    }, []);

    const handlePressIn = () => {
        Animated.timing(pressAction, {
            duration: ACTION_TIMER,
            toValue: 1
        }).start(animationActionComplete);
    };

    const handlePressOut = () => {
        Animated.timing(pressAction, {
            duration: _valueRef.current * ACTION_TIMER,
            toValue: 0
        }).start();
    };

    const animationActionComplete = () => {
        // var message = '';
        // if (_valueRef.current === 1) {
        //     message = 'You held it long enough to fire the action!';
        //     console.log("complete", message);
        // }
    };

    const getButtonWidthLayout = (e) => {
        setButtonWidth(e.nativeEvent.layout.width);
        setButtonHeight(e.nativeEvent.layout.height);
    };

    const getProgressStyles = () => {
        const width = pressAction.interpolate({
            inputRange: [0, 1],
            outputRange: [0, buttonWidth]
        });
        const bgColor = pressAction.interpolate({
            inputRange: [0, 1],
            outputRange: COLORS
        });
        return {
            width: width,
            height: buttonHeight,
            backgroundColor: bgColor
        }
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <View style={styles.container} onLayout={getButtonWidthLayout}>
                <Animated.View style={[styles.bgFill, getProgressStyles()]}/>

                <View style={{marginRight: 10}}>
                    {icon}
                </View>
                <Text style={{color: isDisabled ? "#A0AEC0" : "#323843"}}>
                    {title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

ActionItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    pressTimer: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool,
    onLongPress: PropTypes.func.isRequired
};
ActionItem.defaultProps = {
    icon: <View/>,
    pressTimer: 700,
    isDisabled:  false,
    onLongPress: () => {console.log("ACTION TRIGGERED")}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        minWidth: 200,
    },
    bgFill: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});

export default ActionItem;
