import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import { View } from "react-native";

const dropdown = ({ fillColor }) => (<View>
    <Svg width="12" height="8" viewBox="0 0 12 8" fill="" xmlns="http://www.w3.org/2000/svg">
        <Path d="M6.0001 7.40001L0.600098 2.00001L2.0001 0.600006L6.0001 4.60001L10.0001 0.600006L11.4001 2.00001L6.0001 7.40001Z" fill={fillColor} />
    </Svg>
</View>
);

dropdown.propTypes = {};
dropdown.defaultProps = {};

export default dropdown;
