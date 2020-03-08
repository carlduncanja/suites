import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const inventory = ({strokeColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M22 1H2V23H22V1Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M12 1V23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M12 15H2" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M6 19H8" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M17 5V8" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

inventory.propTypes = {};
inventory.defaultProps = {};

export default inventory;
