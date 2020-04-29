import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const AddNewIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.94975 3V12.8995M3 7.94975H12.8995" stroke="#718096" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

AddNewIcon.propTypes = {};
AddNewIcon.defaultProps = {};

export default AddNewIcon;
