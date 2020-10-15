import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const AlertLeft = ({fillColor}) => (<View>
        <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.600025 6.00001L6.00002 0.600006L7.40002 2.00001L3.40002 6.00001L7.40002 10L6.00002 11.4L0.600025 6.00001Z" fill="#718096"/>
        </Svg>

    </View>
);

AlertLeft.propTypes = {};
AlertLeft.defaultProps = {};

export default AlertLeft;
