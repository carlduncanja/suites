import React from 'react';
import PropTypes from 'prop-types';
import {View} from "react-native";
import {Svg, Path} from "react-native-svg";

function QuickMenu(props) {
    return (
        <View>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1 9H23" stroke="#CCD6E0" stroke-miterlimit="10" stroke-linecap="square"/>
                <Path d="M1 3H23" stroke="#CCD6E0" stroke-miterlimit="10" stroke-linecap="square"/>
                <Path d="M1 15H11" stroke="#CCD6E0" stroke-miterlimit="10" stroke-linecap="square"/>
                <Path d="M1 21H11" stroke="#CCD6E0" stroke-miterlimit="10" stroke-linecap="square"/>
                <Path d="M19 14V22" stroke="#CCD6E0" stroke-miterlimit="10" stroke-linecap="square"/>
                <Path d="M23 18H15" stroke="#CCD6E0" stroke-miterlimit="10" stroke-linecap="square"/>
            </Svg>
        </View>
    );
}

QuickMenu.propTypes = {};
QuickMenu.defaultProps = {};

export default QuickMenu;
