import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const PersonIcon = ({strokeColor = "#CCD6E0" }) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M11.992 11.737L14.2 13.4C14.4484 13.5863 14.65 13.8279 14.7889 14.1056C14.9277 14.3833 15 14.6895 15 15V16H7V15C7 14.6895 7.07229 14.3833 7.21115 14.1056C7.35 13.8279 7.55161 13.5863 7.8 13.4L10.008 11.737" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M13 9C13 7.89543 12.1046 7 11 7C9.89543 7 9 7.89543 9 9V10C9 11.1046 9.89543 12 11 12C12.1046 12 13 11.1046 13 10V9Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M2 1H18C18.5304 1 19.0391 1.21071 19.4142 1.58579C19.7893 1.96086 20 2.46957 20 3V21C20 21.5304 19.7893 22.0391 19.4142 22.4142C19.0391 22.7893 18.5304 23 18 23H2V1Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M23 5V9" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

PersonIcon.propTypes = {};
PersonIcon.defaultProps = {};

export default PersonIcon;
