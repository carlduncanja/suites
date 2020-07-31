import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const LeftSelectorIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M10.5 0.5L5.5 8L10.5 15.5" stroke="#2D3748" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

LeftSelectorIcon.propTypes = {};
LeftSelectorIcon.defaultProps = {};

export default LeftSelectorIcon;
