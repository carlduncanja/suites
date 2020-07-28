import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const SearchIcon = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M15.5 15.4999L11.742 11.7419" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

SearchIcon.propTypes = {};
SearchIcon.defaultProps = {};

export default SearchIcon;
