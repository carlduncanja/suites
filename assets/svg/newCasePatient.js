import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const patient = ({strokeColor, fillColor}) => (<View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M12 6C10.343 6 9 4.657 9 3C9 1.343 10.343 0 12 0C13.657 0 15 1.343 15 3C15 4.657 13.657 6 12 6Z" fill={fillColor}/>
            <Path d="M14 21H10C9.448 21 9 20.552 9 20V15H7V9C7 7.895 7.895 7 9 7H15C16.105 7 17 7.895 17 9V15H15V20C15 20.552 14.552 21 14 21Z" fill={fillColor}/>
            <Path d="M17 17.271V19.29C19.738 19.617 21.284 20.152 21.837 20.507C20.935 21.099 17.573 22 12 22C6.427 22 3.065 21.099 2.163 20.507C2.716 20.152 4.262 19.617 7 19.29V17.271C3.657 17.633 0 18.489 0 20.505C0 23.832 9.996 24 12 24C14.004 24 24 23.832 24 20.505C24 18.489 20.343 17.633 17 17.271Z" fill={strokeColor}/>
        </Svg>
    </View>
);

patient.propTypes = {};
patient.defaultProps = {};

export default patient;
