import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const BreadCrumbIcon = ({strokeColor}) => (<View>
        <Svg width="6" height="16" viewBox="0 0 6 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.5 0.5L5.5 8L0.5 15.5" stroke="#A0AEC0" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

BreadCrumbIcon.propTypes = {};
BreadCrumbIcon.defaultProps = {};

export default BreadCrumbIcon;
