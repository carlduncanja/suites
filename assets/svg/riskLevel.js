import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const riskLevel = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9 6H7V10H9V6Z" fill={fillColor}/>
            <Path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill={fillColor}/>
            <Path d="M15 16H1.00002C0.653016 16 0.332016 15.82 0.149016 15.525C-0.0339842 15.23 -0.0499843 14.862 0.105016 14.552L7.10502 0.551957C7.44502 -0.126043 8.55402 -0.126043 8.89402 0.551957L15.894 14.552C16.049 14.862 16.033 15.23 15.85 15.525C15.667 15.82 15.347 16 15 16ZM2.61802 14H13.382L8.00002 3.23596L2.61802 14Z" fill={fillColor}/>
        </Svg>
    </View>
);

riskLevel.propTypes = {};
riskLevel.defaultProps = {};

export default riskLevel;
