import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const CaseFolderIcon = ({fillColor}) => (<View>
        <Svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M24.5 6L18.5 0H3.5C1.8425 0 0.5 1.3425 0.5 3V54C0.5 57.3135 3.1865 60 6.5 60H63.5C66.8135 60 69.5 57.3135 69.5 54V12C69.5 8.6865 66.8135 6 63.5 6H24.5Z" fill="#0CB0E7"/>
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M38 39H32C27.8585 39 24.5 42.3585 24.5 46.5C24.5 47.328 25.175 48 26.0105 48H43.9895C44.8235 48 45.5 47.3205 45.5 46.5C45.5 42.3585 42.1415 39 38 39Z" fill="white"/>
            <Path d="M35 36C38.3137 36 41 33.3137 41 30C41 26.6863 38.3137 24 35 24C31.6863 24 29 26.6863 29 30C29 33.3137 31.6863 36 35 36Z" fill="white"/>
            <Path d="M69.5 15H0.5V3C0.5 1.3425 1.8425 0 3.5 0H18.5L24.5 6H63.5C66.8135 6 69.5 8.6865 69.5 12V15Z" fill="#047FA8"/>
        </Svg>

    </View>
);

CaseFolderIcon.propTypes = {};
CaseFolderIcon.defaultProps = {};

export default CaseFolderIcon;
