import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {View} from 'react-native';

const DiscountIcon = ({strokeColor = '#00A9CE' }) => (
    <View>
        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M3 5.5C4.38071 5.5 5.5 4.38071 5.5 3C5.5 1.61929 4.38071 0.5 3 0.5C1.61929 0.5 0.5 1.61929 0.5 3C0.5 4.38071 1.61929 5.5 3 5.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M11 13.5C12.3807 13.5 13.5 12.3807 13.5 11C13.5 9.61929 12.3807 8.5 11 8.5C9.61929 8.5 8.5 9.61929 8.5 11C8.5 12.3807 9.61929 13.5 11 13.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M8.5 0.5H13.5V5.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M13.5 0.5L0.5 13.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

DiscountIcon.propTypes = {};
DiscountIcon.defaultProps = {};

export default DiscountIcon;
