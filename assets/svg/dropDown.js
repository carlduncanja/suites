import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const DropDownIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.99961 11.4L2.59961 5.99998L3.99961 4.59998L7.99961 8.59998L11.9996 4.59998L13.3996 5.99998L7.99961 11.4Z" fill="#718096"/>
        </Svg>
    </View>
);

DropDownIcon.propTypes = {};
DropDownIcon.defaultProps = {};

export default DropDownIcon;
