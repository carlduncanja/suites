import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const medications = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M14.4 1.5999C12.3 -0.500098 8.90002 -0.500098 6.80002 1.5999L1.60002 6.7999C-0.499976 8.8999 -0.499976 12.2999 1.60002 14.3999C3.70002 16.4999 7.10002 16.4999 9.20002 14.3999L14.4 9.1999C16.5 7.0999 16.5 3.6999 14.4 1.5999ZM7.80002 12.9999C6.50002 14.2999 4.30002 14.2999 3.00002 12.9999C1.70002 11.6999 1.70002 9.4999 3.00002 8.1999L4.90002 6.2999L9.70002 11.0999C9.70002 11.0999 9.10002 11.6999 7.80002 12.9999ZM13 7.7999L11.1 9.6999L6.30002 4.8999L8.20002 2.9999C8.90002 2.2999 9.70003 1.9999 10.6 1.9999C11.5 1.9999 12.3 2.2999 13 2.9999C14.3 4.2999 14.3 6.4999 13 7.7999Z" fill={fillColor}/>
        </Svg>
    </View>
);

medications.propTypes = {};
medications.defaultProps = {};

export default medications;
