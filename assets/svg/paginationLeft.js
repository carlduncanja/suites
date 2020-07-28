import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const PaginatorLeft = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M10.5 13.5L4.5 8L10.5 2.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

PaginatorLeft.propTypes = {};
PaginatorLeft.defaultProps = {};

export default PaginatorLeft;
