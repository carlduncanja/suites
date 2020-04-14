import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const actionIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8 5V11" stroke="#3182CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M5 8H11" stroke="#3182CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Rect x="1" y="1" width="14" height="14" stroke="#A0AEC0" stroke-linecap="round" stroke-linejoin="round"
                  stroke-dasharray="6 6"/>
        </Svg>
    </View>
);

actionIcon.propTypes = {};
actionIcon.defaultProps = {};

export default actionIcon;
