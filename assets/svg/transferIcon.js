import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const TransferIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.5 12.5L15.5 12.5" stroke="#DD6B20" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12.5 15.5L15.5 12.5L12.5 9.5" stroke="#DD6B20" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M2.5 0.5L0.5 0.5L0.5 2.5" stroke="#DD6B20" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M6.5 2.5L6.5 0.5L4.5 0.5" stroke="#DD6B20" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4.5 6.5L6.5 6.5L6.5 4.5" stroke="#DD6B20" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M0.5 4.5L0.5 6.5L2.5 6.5" stroke="#DD6B20" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M15.5 6.5L15.5 0.5L9.5 0.5L9.5 6.5L15.5 6.5Z" stroke="#DD6B20" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

TransferIcon.propTypes = {};
TransferIcon.defaultProps = {};

export default TransferIcon;
