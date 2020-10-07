import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const NotificationIcon = ({strokeColor = "#CCD6E0" }) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M19.6364 11V8C19.6364 6.14348 18.8318 4.36301 17.3997 3.05025C15.9676 1.7375 14.0253 1 12 1C9.97471 1 8.03237 1.7375 6.60027 3.05025C5.16818 4.36301 4.36364 6.14348 4.36364 8V11C4.36364 14.3 1.09091 15.1 1.09091 17C1.09091 18.7 5.34545 20 12 20C18.6545 20 22.9091 18.7 22.9091 17C22.9091 15.1 19.6364 14.3 19.6364 11Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M9.74862 22.4498C10.468 22.4831 11.2178 22.5 12 22.5C12.7822 22.5 13.532 22.4831 14.2514 22.4498C14.0867 22.6583 13.8857 22.845 13.653 23.0017C13.1778 23.3216 12.5987 23.497 12 23.497C11.4013 23.497 10.8222 23.3216 10.347 23.0017C10.1143 22.845 9.91327 22.6583 9.74862 22.4498Z" stroke={strokeColor}/>
        </Svg>
    </View> 
);

NotificationIcon.propTypes = {};
NotificationIcon.defaultProps = {};

export default NotificationIcon;
