import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const finalDiagnosis = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M6.3 11.7L4.3 9.7C3.9 9.3 3.9 8.7 4.3 8.3C4.7 7.9 5.3 7.9 5.7 8.3L7 9.6L10.3 6.3C10.7 5.9 11.3 5.9 11.7 6.3C12.1 6.7 12.1 7.3 11.7 7.7L7.7 11.7C7.3 12.1 6.8 12.2 6.3 11.7Z" fill={fillColor}/>
            <Path d="M15 1H12V3H14V14H2V3H4V1H1C0.4 1 0 1.4 0 2V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V2C16 1.4 15.6 1 15 1Z" fill={fillColor}/>
            <Path d="M11 0H5V4H11V0Z" fill={fillColor}/>
        </Svg>
    </View>
);

finalDiagnosis.propTypes = {};
finalDiagnosis.defaultProps = {};

export default finalDiagnosis;
