import React, { Component } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { View } from 'react-native';

const disabledFloatingButton = () => {
    return (<View>
        <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="24" cy="24" r="23.5" fill="white" stroke="#E3E8EF" />
            <Path d="M31 16H17C16.4 16 16 16.4 16 17V31C16 31.6 16.4 32 17 32H31C31.6 32 32 31.6 32 31V17C32 16.4 31.6 16 31 16ZM30 30H18V18H30V30Z" fill="#CCD6E0" />
            <Path d="M28 21H20V23H28V21Z" fill="#CCD6E0" />
            <Path d="M28 25H20V27H28V25Z" fill="#CCD6E0" />
        </Svg>
    </View>)
}

export default disabledFloatingButton;

