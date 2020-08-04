import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import { View } from "react-native";

const ClearIcon = ({ strokeColor }) => (<View>
    <Svg width="19" height="19" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#718096" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M11 5L5 11" stroke="#718096" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M5 5L11 11" stroke="#718096" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
</View>
);

ClearIcon.propTypes = {};
ClearIcon.defaultProps = {};

export default ClearIcon;
