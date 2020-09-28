import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

const filterIcon = ({strokeColor = "#FFFFFF"}) => { 
    return (<View>

        <Svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 1H13.8571L8.71429 7.85714V13H6.14286V7.85714L1 1Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

        {/* <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="24" height="24" rx="4" fill="#4E5664" />
            <Path d="M6 6H18.8571L13.7143 12.8571V18H11.1429V12.8571L6 6Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </Svg> */}


    </View>)
}

export default filterIcon;

