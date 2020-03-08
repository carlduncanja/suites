import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const orders = ({strokeColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 1H4V16H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M6 23C7.10457 23 8 22.1046 8 21C8 19.8954 7.10457 19 6 19C4.89543 19 4 19.8954 4 21C4 22.1046 4.89543 23 6 23Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M21 23C22.1046 23 23 22.1046 23 21C23 19.8954 22.1046 19 21 19C19.8954 19 19 19.8954 19 21C19 22.1046 19.8954 23 21 23Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M23 1H8V12H23V1Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M8 5H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

orders.propTypes = {};
orders.defaultProps = {};

export default orders;
