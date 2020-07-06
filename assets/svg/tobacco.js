import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const tobacco = ({fillColor}) => (<View>
        <Svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8 8V14C10.1217 14 12.1566 13.1571 13.6569 11.6569C15.1571 10.1566 16 8.12173 16 6V0C13.8783 0 11.8434 0.842855 10.3431 2.34315C8.84285 3.84344 8 5.87827 8 8Z" fill={fillColor}/>
            <Path d="M0 5V8C0 9.5913 0.632141 11.1174 1.75736 12.2426C2.88258 13.3679 4.4087 14 6 14V11C6 9.4087 5.36786 7.88258 4.24264 6.75736C3.11742 5.63214 1.5913 5 0 5H0Z" fill={fillColor}/>
        </Svg>   
    </View>
);

tobacco.propTypes = {};
tobacco.defaultProps = {};

export default tobacco;
