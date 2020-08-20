import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const ItemArrow = ({strokeColor}) => (<View>
        <Svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M14.5 8.5L4.5 8.5C2.291 8.5 0.5 6.709 0.5 4.5L0.500001 0.499999" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M9.5 13.5L14.5 8.5L9.5 3.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

ItemArrow.propTypes = {};
ItemArrow.defaultProps = {};

export default ItemArrow;
