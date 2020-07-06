import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const RightArrow = ({strokeColor}) => (<View>
        <Svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 1L7 6.5L1 12" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

RightArrow.propTypes = {};
RightArrow.defaultProps = {};

export default RightArrow;
