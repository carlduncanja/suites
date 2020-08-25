import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

const filterIcon = () => {
    return (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="24" height="24" rx="4" fill="#0CB0E7" />
            <Path d="M6 6H18.8571L13.7143 12.8571V18H11.1429V12.8571L6 6Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>


    </View>)
}

export default filterIcon;

