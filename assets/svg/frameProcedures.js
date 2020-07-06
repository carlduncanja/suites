import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const frameProcedures = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M11.4002 8.99997L6.7002 5.89997L10.0002 1.19997C10.9002 -3.39746e-05 12.6002 -0.400034 13.9002 0.499966C15.2002 1.39997 15.6002 3.19997 14.7002 4.49997L11.4002 8.99997Z" fill={fillColor}/>
            <Path d="M8.5 9.5L5.6 7.5L0 15.4L8 13L7.5 11L8.5 9.5Z" fill={fillColor}/>
        </Svg>  
    </View>
);

frameProcedures.propTypes = {};
frameProcedures.defaultProps = {};

export default frameProcedures;
