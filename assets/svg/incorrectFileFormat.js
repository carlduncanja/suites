import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {View} from 'react-native';

const IncorrectFormat = ({fillColor}) => (
    <View>
        <Svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M36 46H2C0.895 46 0 45.105 0 44V2C0 0.895 0.895 0 2 0H26L38 12V44C38 45.105 37.105 46 36 46Z" fill="#E2E8F0"/>
            <Path d="M26 0V10C26 11.105 26.895 12 28 12H38L26 0Z" fill="#A0AEC0"/>
            <Path d="M19 27C18.447 27 18 26.552 18 26V12C18 11.448 18.447 11 19 11C19.553 11 20 11.448 20 12V26C20 26.552 19.553 27 19 27Z" fill="white"/>
            <Path d="M19 34C20.1046 34 21 33.1046 21 32C21 30.8954 20.1046 30 19 30C17.8954 30 17 30.8954 17 32C17 33.1046 17.8954 34 19 34Z" fill="white"/>
        </Svg>
    </View>
);

export default IncorrectFormat;
