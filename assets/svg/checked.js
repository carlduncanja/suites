
import React, { Component } from 'react';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { View } from 'react-native';
const ErrorIcon = ({ strikethrough }) => {
    return (<View>
        <Svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/Svg">
            <G filter="url(#filter0_dd_14409_265989)">
                <Rect x="3.00098" y="2" width="32" height="30" rx="6" fill="#0CB0E7" />
                <G clip-Path="url(#clip0_14409_265989)">
                    <Path d="M17.001 23.3678L11.001 17.3678L11.9436 16.4251L17.001 21.4818L26.0583 12.4251L27.001 13.3678L17.001 23.3678Z" fill="white" />
                </G>
            </G>
        </Svg>
    </View>)
}

export default ErrorIcon;

