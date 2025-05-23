import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const AcceptIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z" stroke="#38A169" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4.5 7.5L7 10L12 5" stroke="#38A169" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

AcceptIcon.propTypes = {};
AcceptIcon.defaultProps = {};

export default AcceptIcon;
