import React from 'react';
import Svg, {Path} from "react-native-svg";
import {View} from "react-native";

const edit = ({strokeColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 9H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
            <Path d="M21 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V2H9L11 5H23V20C23 20.5304 22.7893 21.0391 22.4142 21.4142C22.0391 21.7893 21.5304 22 21 22Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
        </Svg>
    </View>
);

edit.propTypes = {};
edit.defaultProps = {};

export default edit;
