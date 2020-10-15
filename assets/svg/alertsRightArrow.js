import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const AlertRight = ({fillColor}) => (<View>
        <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.39998 5.99999L1.99998 11.4L0.599976 9.99999L4.59998 5.99999L0.599976 1.99999L1.99998 0.599995L7.39998 5.99999Z" fill="#718096"/>
        </Svg>

    </View>
);

AlertRight.propTypes = {};
AlertRight.defaultProps = {};

export default AlertRight;
