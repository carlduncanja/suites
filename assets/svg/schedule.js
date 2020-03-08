import React from 'react';
import Svg, {Path} from "react-native-svg";
import {View} from "react-native";

const schedule = ({strokeColor, fillColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 20L17 22L22 17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M10 22H1V4H23V12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M7 1V4" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M17 1V4" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M1 8H23" stroke={strokeColor} stroke-miterlimit="10"/>
        </Svg>
    </View>
);

schedule.propTypes = {};
schedule.defaultProps = {};

export default schedule;
