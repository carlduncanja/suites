import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const CalendarIcon = ({strokeColor = "#3182CE"}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 5.5H15" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M14 2.5H2C1.448 2.5 1 2.948 1 3.5V14.5C1 15.052 1.448 15.5 2 15.5H14C14.552 15.5 15 15.052 15 14.5V3.5C15 2.948 14.552 2.5 14 2.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4 0.5V2.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12 0.5V2.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M8 0.5V2.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M6 7.5V13.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M10 7.5V13.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M3 10.5H13" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

CalendarIcon.propTypes = {};
CalendarIcon.defaultProps = {};

export default CalendarIcon;
