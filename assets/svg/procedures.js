import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const procedures = ({strokeColor}) => (<View>
        <Svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M12 6.98138L2 16.9814L11 15.9814L12 12.9814L15 9.98138" stroke={strokeColor} stroke-miterlimit="10"/>
            <Path d="M16 10.9814L12 6.98138L17.153 1.82838C18.256 0.725375 20.047 0.722375 21.153 1.82838C22.258 2.93338 22.258 4.72338 21.153 5.82838L16 10.9814Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

procedures.propTypes = {};
procedures.defaultProps = {};

export default procedures;
