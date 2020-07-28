import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const TabRightCorner = ({fillColor}) => (<View>
        <Svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H8C3.58172 8 0 4.41828 0 0V8Z" fill={fillColor}/>
        </Svg>
    </View>
);

TabRightCorner.propTypes = {};
TabRightCorner.defaultProps = {};

export default TabRightCorner;
