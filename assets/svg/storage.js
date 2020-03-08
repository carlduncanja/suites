import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const storage = ({strokeColor}) => (<View>
        <Svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M12 14H4V21H12V14Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M20 14H12V21H20V14Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M16 7H8V14H16V7Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M1 6L12 1L23 6" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M12 7V9" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M16 14V16" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M8 14V16" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

storage.propTypes = {};
storage.defaultProps = {};

export default storage;
