import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const ArchiveIcon = ({strokeColor = "#104587" }) => (<View>
        <Svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M2.5 0.5H13.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M11.5 6.5V8.5H4.5V6.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M15.5 3.5H0.5V14.5H15.5V3.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

ArchiveIcon.propTypes = {};
ArchiveIcon.defaultProps = {};

export default ArchiveIcon;
