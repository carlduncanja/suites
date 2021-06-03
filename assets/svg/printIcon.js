import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {View} from 'react-native';

const PrintIcon = ({strokeColor = '#525B64'}) => (
    <View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M3.5 3.5V0.5H12.5V3.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M3.5 12.5H0.5V8.5C0.5 7.70435 0.81607 6.94129 1.37868 6.37868C1.94129 5.81607 2.70435 5.5 3.5 5.5H12.5C13.2956 5.5 14.0587 5.81607 14.6213 6.37868C15.1839 6.94129 15.5 7.70435 15.5 8.5V12.5H12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M12.5 9.5H3.5V15.5H12.5V9.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

export default PrintIcon;
