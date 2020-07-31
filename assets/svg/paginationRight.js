import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const PaginatorRight = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5 3L11 8.5L5 14" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

PaginatorRight.propTypes = {};
PaginatorRight.defaultProps = {};

export default PaginatorRight;
