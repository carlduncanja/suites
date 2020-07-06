import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const preExistingConditions = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 1.00006H12V3.00006H14V14.0001H2V3.00006H4V1.00006H1C0.4 1.00006 0 1.40006 0 2.00006V15.0001C0 15.6001 0.4 16.0001 1 16.0001H15C15.6 16.0001 16 15.6001 16 15.0001V2.00006C16 1.40006 15.6 1.00006 15 1.00006Z" fill={fillColor}/>
            <Path d="M11 6.10352e-05H5V4.00006H11V6.10352e-05Z" fill={fillColor}/>
            <Path d="M11 8.00006H9V6.00006H7V8.00006H5V10.0001H7V12.0001H9V10.0001H11V8.00006Z" fill={fillColor}/>
        </Svg>
    </View>
);

preExistingConditions.propTypes = {};
preExistingConditions.defaultProps = {};

export default preExistingConditions;
