import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const ResolveIcon = ({strokeColor = "#CCD6E0" }) => (<View>
        <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M4.5 5.5L7.5 8.5L12.5 1.5" stroke="#EEF2F6" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M8.99747 1.87499C7.86277 1.43215 6.61316 1.37852 5.44469 1.7225C4.27622 2.06648 3.25498 2.78861 2.5412 3.77561C1.82741 4.76261 1.46147 5.95863 1.50076 7.17605C1.54005 8.39347 1.98236 9.56341 2.75831 10.5023C3.53425 11.4412 4.59993 12.096 5.78815 12.3639C6.97637 12.6319 8.21992 12.4977 9.32371 11.9827C10.4275 11.4676 11.3291 10.6007 11.887 9.51789C12.4449 8.43513 12.6276 7.19779 12.4065 5.99999" stroke="#EEF2F6" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    </View>
);

ResolveIcon.propTypes = {};
ResolveIcon.defaultProps = {};

export default ResolveIcon;
