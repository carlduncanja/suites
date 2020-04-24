import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const physicians = ({strokeColor, fillColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M12 10V14" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M10 12H14" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M8 6V2H16V6" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M23 6H1V18H23V6Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M22 18V22H2V18" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

physicians.propTypes = {};
physicians.defaultProps = {};

export default physicians;
