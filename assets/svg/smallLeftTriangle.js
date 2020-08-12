import React from 'react';
import Svg, { Path, Rect } from "react-native-svg";
import { View } from "react-native";


const smallLeftTriangle = ({ strokecolor }) =>
    (<View>


        <Svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="32" height="30" rx="4" fill="#EEF2F6" />
            <Path d="M19.1006 22.7188L11.4006 15.5L19.1006 8.28127L20.6006 9.59377L14.3006 15.5L20.6006 21.4063L19.1006 22.7188Z" fill="#718096" />
        </Svg>
    </View>)

export default smallLeftTriangle;