import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const PersonIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M11.3333 4C11.3333 5.84133 9.84133 8.66666 8 8.66666C6.15866 8.66666 4.66666 5.84133 4.66666 4C4.66666 3.11594 5.01785 2.2681 5.64297 1.64297C6.2681 1.01785 7.11594 0.666664 8 0.666664C8.88405 0.666664 9.7319 1.01785 10.357 1.64297C10.9821 2.2681 11.3333 3.11594 11.3333 4V4Z" stroke="#CCD6E0" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M2.96932 9.33333C1.89377 10.3481 1.15013 11.6644 0.835983 13.1093C2.94423 14.5579 5.44206 15.3333 7.99998 15.3333C10.5579 15.3333 13.0557 14.5579 15.164 13.1093C14.8498 11.6644 14.1062 10.3481 13.0306 9.33333" stroke="#CCD6E0" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

PersonIcon.propTypes = {};
PersonIcon.defaultProps = {};

export default PersonIcon;
