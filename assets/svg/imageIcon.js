import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const ImageIcon = ({strokeColor}) => (<View>
        <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M2.5 11.5L8.5 5.5L11.5 8.5" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M10.5 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V10.5C0.5 11.0523 0.947715 11.5 1.5 11.5H10.5C11.0523 11.5 11.5 11.0523 11.5 10.5V1.5C11.5 0.947715 11.0523 0.5 10.5 0.5Z" stroke="#3182CE" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4.5 4C4.5 4.27614 4.27614 4.5 4 4.5C3.72386 4.5 3.5 4.27614 3.5 4C3.5 3.72386 3.72386 3.5 4 3.5C4.27614 3.5 4.5 3.72386 4.5 4Z" fill="black" stroke="#3182CE"/>
        </Svg>
    </View>
);

ImageIcon.propTypes = {};
ImageIcon.defaultProps = {};

export default ImageIcon;
