import React from 'react';
import Svg, {Path} from "react-native-svg";
import {View} from "react-native";

const GenerateIcon = ({strokeColor = "#805AD5"}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15.5 0.5L7.5 8.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M8.5 0.5H15.5V7.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4.5 0.5H1.5C0.948 0.5 0.5 0.948 0.5 1.5V14.5C0.5 15.052 0.948 15.5 1.5 15.5H14.5C15.052 15.5 15.5 15.052 15.5 14.5V11.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

GenerateIcon.propTypes = {};
GenerateIcon.defaultProps = {};

export default GenerateIcon;
