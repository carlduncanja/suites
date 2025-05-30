import React, { Component } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { View } from 'react-native';
const ErrorIcon = ({ strikethrough }) => {
    return (<View>
        <Svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="36" cy="36" r="36" fill="#EBF8FF" />
            <Path d="M45.3333 50C45.1628 50 44.9922 49.9349 44.862 49.8047L36 40.9427L27.138 49.8047C26.8776 50.0651 26.4557 50.0651 26.1953 49.8047L22.1953 45.8047C21.9349 45.5443 21.9349 45.1224 22.1953 44.862L31.0573 36L22.1953 27.138C21.9349 26.8776 21.9349 26.4557 22.1953 26.1953L26.1953 22.1953C26.4557 21.9349 26.8776 21.9349 27.138 22.1953L36 31.0573L44.862 22.1953C45.1224 21.9349 45.5443 21.9349 45.8047 22.1953L49.8047 26.1953C50.0651 26.4557 50.0651 26.8776 49.8047 27.138L40.9427 36L49.8047 44.862C50.0651 45.1224 50.0651 45.5443 49.8047 45.8047L45.8047 49.8047C45.6745 49.9349 45.5039 50 45.3333 50Z" fill="#E86C60" />
        </Svg>
    </View>)
}

export default ErrorIcon;

