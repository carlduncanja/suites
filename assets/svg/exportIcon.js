import React, { Component } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { View } from 'react-native';

const ExportIcon = ({ strikethrough, strokeColor = '#805AD5' }) => {
    return (
        <View>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M11.5 4.5L8 0.5L4.5 4.5H6.5V10.5H9.5V4.5H11.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M12.5 6.5H14.5C15.052 6.5 15.5 6.948 15.5 7.5V14.5C15.5 15.052 15.052 15.5 14.5 15.5H1.5C0.948 15.5 0.5 15.052 0.5 14.5V7.5C0.5 6.948 0.948 6.5 1.5 6.5H3.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
    );
};

export default ExportIcon;
