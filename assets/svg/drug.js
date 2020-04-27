import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const drug = ({fillColor}) => (<View>
        <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M13.3002 12.7L9.0002 7.6V4H10.0002C10.6002 4 11.0002 3.6 11.0002 3V1C11.0002 0.4 10.6002 0 10.0002 0H4.0002C3.4002 0 3.0002 0.4 3.0002 1V3C3.0002 3.6 3.4002 4 4.0002 4H5.0002V7.6L0.700195 12.7C0.200195 13.3 0.100195 14.1 0.400195 14.8C0.700195 15.5 1.4002 16 2.2002 16H11.9002C12.7002 16 13.4002 15.6 13.7002 14.8C14.0002 14.1 13.9002 13.3 13.3002 12.7Z" fill={fillColor}/>
        </Svg>
    </View>
);

drug.propTypes = {};
drug.defaultProps = {};

export default drug;
