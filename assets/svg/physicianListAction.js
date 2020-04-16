import React from 'react';
import Svg, {Path} from "react-native-svg";
import { View } from 'react-native';

const physicianListAction = () => (
    <View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.5 5.5H15.5" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M15.5 5.5V3.5C15.5 3.23478 15.3946 2.98043 15.2071 2.79289C15.0196 2.60536 14.7652 2.5 14.5 2.5H1.5C1.23478 2.5 0.98043 2.60536 0.792893 2.79289C0.605357 2.98043 0.5 3.23478 0.5 3.5V14.5C0.5 14.7652 0.605357 15.0196 0.792893 15.2071C0.98043 15.3946 1.23478 15.5 1.5 15.5H6.5" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4.5 0.5V2.5" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M11.5 0.5V2.5" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M11.5 15.5C13.7091 15.5 15.5 13.7091 15.5 11.5C15.5 9.29086 13.7091 7.5 11.5 7.5C9.29086 7.5 7.5 9.29086 7.5 11.5C7.5 13.7091 9.29086 15.5 11.5 15.5Z" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M11.5 9.5V13.5" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M9.5 11.5H13.5" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
    
)

physicianListAction.propTypes = {};
physicianListAction.defaultProps = {};

export default physicianListAction