import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const provisionalDiagnosis = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 1H12V3H14V14H2V3H4V1H1C0.4 1 0 1.4 0 2V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V2C16 1.4 15.6 1 15 1Z" fill={fillColor}/>
            <Path d="M11 0H5V4H11V0Z" fill={fillColor}/>
            <Path d="M11 8H9V6H7V8H5V10H7V12H9V10H11V8Z" fill={fillColor}/>
        </Svg>
    </View>
);

provisionalDiagnosis.propTypes = {};
provisionalDiagnosis.defaultProps = {};

export default provisionalDiagnosis;
