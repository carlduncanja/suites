import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const alcohol = ({fillColor}) => (<View>
        <Svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7 0H3V2H7V0Z" fill={fillColor}/>
            <Path d="M7 7V4H3V7C1.3 7 0 8.3 0 10V15C0 15.6 0.4 16 1 16H9C9.6 16 10 15.6 10 15V10C10 8.3 8.7 7 7 7Z" fill={fillColor}/>
        </Svg>
    </View>
);

alcohol.propTypes = {};
alcohol.defaultProps = {};

export default alcohol;
