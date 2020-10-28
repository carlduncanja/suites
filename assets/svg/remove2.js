import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const RemoveIcon = ({strokeColor = "#A0AEC0"}) => (<View>
        <Svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.5 0.5L0.5 7.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M0.5 0.5L7.5 7.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

RemoveIcon.propTypes = {};
RemoveIcon.defaultProps = {};

export default RemoveIcon;
