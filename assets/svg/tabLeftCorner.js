import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const TabLeftCorner = ({fillColor}) => (<View>
        <Svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M8 8V0C8 4.41828 4.41828 8 0 8H8Z" fill={fillColor}/>
        </Svg>
    </View>
);

TabLeftCorner.propTypes = {};
TabLeftCorner.defaultProps = {};

export default TabLeftCorner;
