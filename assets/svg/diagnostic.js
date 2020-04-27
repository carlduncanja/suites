import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const diagnostic = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M2 2H5V0H1C0.447 0 0 0.447 0 1V5H2V2Z" fill={fillColor}/>
            <Path d="M15 0H11V2H14V5H16V1C16 0.447 15.553 0 15 0Z" fill={fillColor}/>
            <Path d="M14 14H11V16H15C15.553 16 16 15.553 16 15V11H14V14Z" fill={fillColor}/>
            <Path d="M2 11H0V15C0 15.553 0.447 16 1 16H5V14H2V11Z" fill={fillColor}/>
            <Path d="M4 10V12H12V10C12 10 11 8 8 8C5 8 4 10 4 10Z" fill={fillColor}/>
            <Path d="M8 7C9.10457 7 10 6.10457 10 5C10 3.89543 9.10457 3 8 3C6.89543 3 6 3.89543 6 5C6 6.10457 6.89543 7 8 7Z" fill={fillColor}/>
        </Svg>
    </View>
);

diagnostic.propTypes = {};
diagnostic.defaultProps = {};

export default diagnostic;
