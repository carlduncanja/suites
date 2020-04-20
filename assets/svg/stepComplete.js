import React from 'react';
import Svg, {Path} from "react-native-svg";
import {View} from "react-native";

const stepComplete = () => (<View>
        <Svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5.6 6.4L1.6 4L0 5.6L5.6 12L16 1.6L14.4 0L5.6 6.4Z" fill="#48BB78"/>
        </Svg>
    </View>
);

stepComplete.propTypes = {};
stepComplete.defaultProps = {};

export default stepComplete;
