import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const threatre = ({strokeColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x="4" y="21.5" width="16" height="2" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
            <Rect x="10" y="17" width="4" height="4.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
            <Path d="M2 17V13H22V17H2Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
            <Path d="M8 5.5C8 4.39543 8.89543 3.5 10 3.5H14C15.1046 3.5 16 4.39543 16 5.5V6.5H8V5.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M12 3V1" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

threatre.propTypes = {};
threatre.defaultProps = {};

export default threatre;
