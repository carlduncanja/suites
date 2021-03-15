import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const RestoreIcon = ({ strokeColor = "#00A9CE" }) => (<View>

    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M14.1481 12C13.2863 13.3213 12.021 14.3289 10.5404 14.873C9.0598 15.4171 7.44308 15.4686 5.93087 15.0197C4.41867 14.5709 3.09183 13.6457 2.14785 12.3819C1.20387 11.1181 0.693225 9.5833 0.691912 8.00589C0.6906 6.42847 1.19869 4.8928 2.14057 3.62744C3.08244 2.36209 4.40773 1.4347 5.91919 0.983324C7.43065 0.531945 9.04746 0.580704 10.529 1.12234C12.0105 1.66398 13.2775 2.66954 14.1414 3.98936" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M16 0V6.66667L10 6L16 0Z" fill={strokeColor} />
    </Svg>
</View>);

export default RestoreIcon;
