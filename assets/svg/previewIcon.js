import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const PreviewIcon = ({strokeColor = "#3182CE"}) => (<View>
       <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M6.5 12.5C9.81371 12.5 12.5 9.81371 12.5 6.5C12.5 3.18629 9.81371 0.5 6.5 0.5C3.18629 0.5 0.5 3.18629 0.5 6.5C0.5 9.81371 3.18629 12.5 6.5 12.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M14.5002 14.5002L10.7422 10.7422" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

PreviewIcon.propTypes = {};
PreviewIcon.defaultProps = {};

export default PreviewIcon;
