import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const SettingsIcon = ({strokeColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M12.026 15C13.6829 15 15.026 13.6569 15.026 12C15.026 10.3431 13.6829 9 12.026 9C10.3691 9 9.026 10.3431 9.026 12C9.026 13.6569 10.3691 15 12.026 15Z" stroke="#CCD6E0" stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M20.026 12C20.0248 11.4239 19.9618 10.8496 19.838 10.287L22.552 8.232L20.552 4.768L17.409 6.094C16.5579 5.3137 15.5477 4.72723 14.448 4.375L14.026 1H10.026L9.604 4.375C8.50435 4.72723 7.49414 5.3137 6.643 6.094L3.5 4.768L1.5 8.232L4.214 10.287C3.96339 11.4153 3.96339 12.5847 4.214 13.713L1.5 15.768L3.5 19.232L6.643 17.906C7.49414 18.6863 8.50435 19.2728 9.604 19.625L10.026 23H14.026L14.448 19.625C15.5477 19.2728 16.5579 18.6863 17.409 17.906L20.552 19.232L22.552 15.768L19.838 13.713C19.9618 13.1504 20.0248 12.5761 20.026 12V12Z" stroke="#CCD6E0" stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

SettingsIcon.propTypes = {};
SettingsIcon.defaultProps = {};

export default SettingsIcon;
