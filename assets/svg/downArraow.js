import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const DownArrow = ({strokeColor}) => (<View>
        <Svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5.5 0.5L3 3.5L0.5 0.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

DownArrow.propTypes = {};
DownArrow.defaultProps = {};

export default DownArrow;
