import React from 'react';
import Svg, {Path} from "react-native-svg";
import {View} from "react-native";

const ArrowRightIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.5 8.5H15.5" stroke="#718096" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M10.5 3.5L15.5 8.5L10.5 13.5" stroke="#718096" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

ArrowRightIcon.propTypes = {};
ArrowRightIcon.defaultProps = {};

export default ArrowRightIcon;
