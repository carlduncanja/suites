import React from 'react';
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";

const Minus = ({ strokeColor }) => (<View>
    <Svg width="16" height="16" viewBox="0 0 16 16" fill={strokeColor} xmlns="http://www.w3.org/2000/svg">
        <Path d="M4 8H12" stroke="#E53E3E" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

</View>);

Minus.propTypes = {};
Minus.defaultProps = {};

export default Minus;