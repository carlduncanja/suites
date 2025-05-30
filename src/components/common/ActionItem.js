import React, { useEffect, useRef, useState } from 'react';
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
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import disabledFloatingButton from '../../../assets/svg/disabledFloatingButton';
import {LONG_PRESS_TIMER} from '../../const';

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

const ActionItemWrapper = styled.TouchableOpacity`
    flex : 1;
    margin : 0;
    width : 100%;
`;

const ActionItemContainer = styled.View`
    flex-direction: row;
    min-width: 200px;
    padding: ${ ({ theme }) => theme.space['--space-6']};
    border-radius: 6px;
`;

const ActionTitle = styled.Text(({ theme, disabled }) => ({
     ...theme.font['--text-base-regular'],
    color: disabled ? theme.colors['--color-gray-600'] : theme.colors['--color-gray-800'],
    marginLeft: 13,
    fontSize: 12,
    flex: 1
    // paddingBottom: 1
}));

const PatientName = styled.Text(({ theme, disabled }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-blue-600'],
    marginLeft: 13,
    fontSize: 12,
    flex: 1
    // paddingBottom: 1
}));

const IconContainer = styled.View`

`;

function ActionItem({ icon, title, disabled, touchable = true, onPress, text="" }) {

    const theme = useTheme();

    function getBreadCrumb(item) {
        const result = item.substring(0,7)
        
        return `${result}...`
    };
    
    return (
        <ActionItemWrapper
            onPress={onPress}
            disabled={!touchable || disabled}
            activeOpacity={disabled ? .3 : 1}
        >
            <ActionItemContainer theme={theme}>
                <IconContainer>
                    {icon}
                </IconContainer>
                
                <ActionTitle theme={theme} disabled={disabled}>{title}</ActionTitle>
                <PatientName>"{getBreadCrumb(text)}"</PatientName>
            </ActionItemContainer>
        </ActionItemWrapper>
    );
}

ActionItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onPress: PropTypes.any.isRequired
};
ActionItem.defaultProps = {
    icon: <View />,
    pressTimer: LONG_PRESS_TIMER.MEDIUM,
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
