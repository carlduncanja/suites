import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const LockIcon = ({strokeColor}) => (<View>
        <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M3.66666 7.33333V4C3.66666 3.11594 4.01785 2.2681 4.64297 1.64298C5.2681 1.01786 6.11594 0.666666 7 0.666666V0.666666C7.43774 0.666666 7.87119 0.752885 8.27561 0.920401C8.68003 1.08792 9.04749 1.33345 9.35702 1.64298C9.66655 1.95251 9.91208 2.31997 10.0796 2.72439C10.2471 3.12881 10.3333 3.56226 10.3333 4V7.33333" stroke="#CCD6E0" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M13 7.33333H1V15.3333H13V7.33333Z" stroke="#CCD6E0" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

LockIcon.propTypes = {};
LockIcon.defaultProps = {};

export default LockIcon;
