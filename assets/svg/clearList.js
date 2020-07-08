import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const ClearList = ({strokeColor}) => (<View>
        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5.875 12.625H1.375V1.375H11.125V5.125" stroke="#A0AEC0" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M3.625 3.625H8.875" stroke="#A0AEC0" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M3.625 5.875H6.625" stroke="#A0AEC0" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M3.625 8.125H5.125" stroke="#A0AEC0" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M3.625 10.375H5.125" stroke="#A0AEC0" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M9.625 12.625C11.2819 12.625 12.625 11.2819 12.625 9.625C12.625 7.96815 11.2819 6.625 9.625 6.625C7.96815 6.625 6.625 7.96815 6.625 9.625C6.625 11.2819 7.96815 12.625 9.625 12.625Z" stroke="#A0AEC0" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M8.125 9.625H11.125" stroke="#A0AEC0" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

ClearList.propTypes = {};
ClearList.defaultProps = {};

export default ClearList;
