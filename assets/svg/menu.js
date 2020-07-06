import React from 'react';
import Svg, {Path} from "react-native-svg";
import {View} from "react-native";

const menu = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V1C16 0.4 15.6 0 15 0ZM14 14H2V2H14V14Z" fill={fillColor}/>
            <Path d="M12 5H4V7H12V5Z" fill={fillColor}/>
            <Path d="M12 9H4V11H12V9Z" fill={fillColor}/>
        </Svg>
    </View>
);

menu.propTypes = {};
menu.defaultProps = {};

export default menu;
