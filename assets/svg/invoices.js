import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const invoices = ({strokeColor}) => (<View>
        <Svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V1H9L12 5H23V19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H19" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M12 8V22" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M15.375 10.219C13.754 9.328 8.648 8.663 8.648 11.732C8.648 15.406 15.132 14.109 15.132 17.351C15.132 20.593 10.918 20.349 8 19.3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

invoices.propTypes = {};
invoices.defaultProps = {};

export default invoices;
