import React, { Component } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { View } from 'react-native';

const WhiteTickIcon = ({ strokeColor }) => (
    <View>
        <Svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.795776 5.27045L6.08499 10.5597L15.2042 1.44043" stroke="white" stroke-width="2" />
        </Svg>
    </View>)

export default WhiteTickIcon;
