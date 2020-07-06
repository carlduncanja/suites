import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const delivery = ({strokeColor, fillColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M20 20V23H16V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M8 20V23H4V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M20 12V1H4V12L2 14V20H22V14L20 12Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M7.5 11.5V8.5H16.5V11.5H7.5Z" fill={strokeColor} stroke={strokeColor}/>
            <Path d="M1 8V10" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M23 8V10" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M6.5 16C6.5 16.2761 6.27614 16.5 6 16.5C5.72386 16.5 5.5 16.2761 5.5 16C5.5 15.7239 5.72386 15.5 6 15.5C6.27614 15.5 6.5 15.7239 6.5 16Z" fill={fillColor} stroke={strokeColor}/>
            <Path d="M18.5 16C18.5 16.2761 18.2761 16.5 18 16.5C17.7239 16.5 17.5 16.2761 17.5 16C17.5 15.7239 17.7239 15.5 18 15.5C18.2761 15.5 18.5 15.7239 18.5 16Z" fill={fillColor} stroke={strokeColor}/>
            <Path d="M4 5H20" stroke={strokeColor} stroke-miterlimit="10"/>
        </Svg>
    </View>
);

delivery.propTypes = {};
delivery.defaultProps = {};

export default delivery;
