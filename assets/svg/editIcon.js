import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const EditIcon = ({strokeColor = '#00A9CE' }) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M13 7L9 3" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M5.5 14.5L0.5 15.5L1.5 10.5L11.5 0.5L15.5 4.5L5.5 14.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

EditIcon.propTypes = {};
EditIcon.defaultProps = {};

export default EditIcon;
