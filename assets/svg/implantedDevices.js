import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const devices = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M16 6V4H14V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H12V0H10V2H6V0H4V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V4H0V6H2V10H0V12H2V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H4V16H6V14H10V16H12V14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V12H16V10H14V6H16ZM12 12H4V4H12V12Z" fill={fillColor}/>
            <Path d="M10 6H6V10H10V6Z" fill={fillColor}/>
        </Svg>
    </View>
);

devices.propTypes = {};
devices.defaultProps = {};

export default devices;
