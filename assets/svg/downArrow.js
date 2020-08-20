import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native-animatable';


const downArrow = ({ strokeColor }) => (<View>
    <Svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M5.02317 0.848825L2.75572 3.56976L0.488281 0.848825" stroke="white" stroke-width="0.906977" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
</View>
);

export default downArrow;

