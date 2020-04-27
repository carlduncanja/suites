import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const signsAndSymptoms = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15.207 8.79301L9.707 3.29301C9.316 2.90201 8.684 2.90201 8.293 3.29301L1.293 10.293C1.165 10.421 1.074 10.582 1.03 10.757L0.0299995 14.757C-0.0550005 15.098 0.0449995 15.458 0.293 15.707C0.483 15.897 0.737999 16 0.999999 16C1.081 16 1.162 15.99 1.243 15.97L5.243 14.97C5.419 14.926 5.579 14.835 5.707 14.707L12 8.41401L13.086 9.50001L9.793 12.793C9.402 13.184 9.402 13.816 9.793 14.207C10.184 14.598 10.816 14.598 11.207 14.207L15.207 10.207C15.598 9.81601 15.598 9.18401 15.207 8.79301Z" fill={fillColor}/>
            <Path d="M11.1211 1.879L14.1211 4.879L15.3791 3.621C16.2071 2.793 16.2071 1.449 15.3791 0.621C14.5511 -0.207 13.2071 -0.207 12.3791 0.621L11.1211 1.879Z" fill={fillColor}/>
        </Svg>
    </View>
);

signsAndSymptoms.propTypes = {};
signsAndSymptoms.defaultProps = {};

export default signsAndSymptoms;
