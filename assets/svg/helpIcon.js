import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const HelpIcon = ({strokeColor = "#CCD6E0"}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M2.20001 10C2.99501 6.08201 6.08201 2.99501 10 2.20001" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M10 21.8C6.08201 21.005 2.99601 17.918 2.20001 14" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M21.8 14C21.005 17.918 17.918 21.004 14 21.8" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M14 2.20001C17.918 2.99501 21.004 6.08201 21.8 10" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M10 7.416V1H14V7.416" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M16.584 10H23V14H16.584" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M14 16.584V23H10V16.584" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M7.416 14H1V10H7.416" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View> 
);

HelpIcon.propTypes = {};
HelpIcon.defaultProps = {};

export default HelpIcon;
