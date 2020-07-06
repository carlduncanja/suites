import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const equipment = ({strokeColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.8152 16V23H19.8152V17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M19.8152 17C21.4721 17 22.8152 15.6569 22.8152 14C22.8152 12.3431 21.4721 11 19.8152 11C18.1583 11 16.8152 12.3431 16.8152 14C16.8152 15.6569 18.1583 17 19.8152 17Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M10.8152 2H13.6152C14.2152 2 14.7152 2.5 14.6152 3.1L13.0152 14.2C12.9152 15.2 12.0152 15.9 11.0152 15.9H4.51521C3.51521 15.9 2.71521 15.2 2.51521 14.2L1.01521 3.1C0.915206 2.5 1.31521 2 2.01521 2H4.81521" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M4.8152 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M10.8152 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

equipment.propTypes = {};
equipment.defaultProps = {};

export default equipment;
