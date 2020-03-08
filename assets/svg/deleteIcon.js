import React from 'react';
import Svg, {Path} from "react-native-svg";
import {View} from "react-native";

const deleteIcon = ({strokeColor}) => (<View>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M8 4.5C11.5899 4.5 14.5 3.60457 14.5 2.5C14.5 1.39543 11.5899 0.5 8 0.5C4.41015 0.5 1.5 1.39543 1.5 2.5C1.5 3.60457 4.41015 4.5 8 4.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M1.5 5.5V13.5C1.5 14.605 4.41 15.5 8 15.5C11.59 15.5 14.5 14.605 14.5 13.5V5.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M5.5 7.5L10.5 12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M10.5 7.5L5.5 12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
);

deleteIcon.propTypes = {};
deleteIcon.defaultProps = {};

export default deleteIcon;
