import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const LeftArrow = ({strokeColor}) => (<View>
        <Svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7 12L1 6.5L7 1" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

LeftArrow.propTypes = {};
LeftArrow.defaultProps = {};

export default LeftArrow;
