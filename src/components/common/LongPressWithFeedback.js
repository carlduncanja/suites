import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    Animated
} from "react-native";
import { LONG_PRESS_TIMER } from '../../const';
// import Animated from "react-native-reanimated";

const COLORS = ['rgba(255,255,255,1)', 'rgba(227, 232, 239, 1)'];

/**
 * Long Press Listener component with visual feed back.
 * Built for press and hold scenarios.
 *
 * Inspired from : https://codedaily.io/tutorials/24/React-Native-Press-and-Hold-Button-Actions
 */
function LongPressWithFeedback(props) {

    const { pressTimer, isDisabled, onLongPress } = props;

    const _valueRef = useRef(0);
    const ACTION_TIMER = pressTimer || LONG_PRESS_TIMER.MEDIUM;

    const [pressAction] = useState(new Animated.Value(0));
    const [viewWidth, setViewWidth] = useState(0);
    const [viewHeight, setViewHeight] = useState(0);

    useEffect(() => {
        pressAction.addListener((v) => {
            _valueRef.current = v.value;

            if (v.value === 1) {
                onLongPress();
            }
        });
    }, []);

    const handlePressIn = () => {
        if (isDisabled) return;
        Animated.timing(pressAction, {
            duration: ACTION_TIMER,
            toValue: 1
        }).start(animationActionComplete);
    };

    const handlePressOut = () => {
        if (isDisabled) return;
        Animated.timing(pressAction, {
            duration: _valueRef.current * ACTION_TIMER,
            toValue: 0
        }).start();
    };

    const animationActionComplete = () => {
    };

    const getButtonWidthLayout = (e) => {
        setViewWidth(e.nativeEvent.layout.width);
        setViewHeight(e.nativeEvent.layout.height);
    };

    const getProgressStyles = () => {
        const width = pressAction.interpolate({
            inputRange: [0, 1],
            outputRange: [0, viewWidth]
        });
        const bgColor = pressAction.interpolate({
            inputRange: [0, 1],
            outputRange: COLORS
        });
        return {
            width: width,
            height: viewHeight,
            backgroundColor: bgColor
        }
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isDisabled}
        >
            <View style={styles.container} onLayout={getButtonWidthLayout}>
                <Animated.View style={[styles.bgFill, getProgressStyles()]} />
                {props.children}
            </View>
        </TouchableWithoutFeedback>
    );
}

LongPressWithFeedback.propTypes = {
    pressTimer: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool,
    onLongPress: PropTypes.func.isRequired
};
LongPressWithFeedback.defaultProps = {
    icon: <View />,
    pressTimer: LONG_PRESS_TIMER.MEDIUM,
    isDisabled: false,
    onLongPress: () => {
        console.log("ACTION TRIGGERED")
    }
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

export default LongPressWithFeedback;
