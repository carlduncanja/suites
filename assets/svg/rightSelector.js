import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const RightSelectorIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5.5 0.5L10.5 8L5.5 15.5" stroke="#2D3748" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

RightSelectorIcon.propTypes = {};
RightSelectorIcon.defaultProps = {};

export default RightSelectorIcon;
