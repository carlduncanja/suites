
import React, { Component } from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { View } from 'react-native';
const ErrorIcon = ({ strikethrough }) => {
    return (<View>
        <Svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="72" height="72" rx="36" fill="#EBF8FF"/>
            <Path d="M35.7131 20C32.3771 20 29 20.9111 29 22.6525C29 22.6748 29.0016 22.6971 29.0044 22.7191C29.6741 27.6953 32.1368 43.9314 35.7132 43.9314C39.2902 43.9314 41.7522 27.6951 42.4219 22.7191C42.4248 22.6971 42.4263 22.6745 42.4263 22.6525C42.4263 20.9111 39.0491 20 35.7132 20H35.7131Z" fill="#F56565"/>
            <Path d="M37.6455 45.1546H33.7819C32.9597 45.1546 32.291 45.8234 32.291 46.6455V50.5091C32.291 51.3313 32.9598 52 33.7819 52H37.6455C38.4677 52 39.1364 51.3312 39.1364 50.5091V46.6455C39.1364 45.8234 38.4676 45.1546 37.6455 45.1546Z" fill="#F56565"/>
        </Svg>
    </View>)
}

export default ErrorIcon;

