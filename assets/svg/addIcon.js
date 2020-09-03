import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const AddIcon = ({strokeColor = "#2F855A"}) => (<View> 
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M8 4V12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4 8H12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

AddIcon.propTypes = {};
AddIcon.defaultProps = {};

export default AddIcon;
