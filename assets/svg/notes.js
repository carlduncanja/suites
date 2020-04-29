import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const notes = ({fillColor}) => (<View>
        <Svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15 0H12V2H14V13H2V2H4V0H1C0.4 0 0 0.4 0 1V14C0 14.6 0.4 15 1 15H15C15.6 15 16 14.6 16 14V1C16 0.4 15.6 0 15 0Z" fill={fillColor}/>
            <Path d="M11 -1H5V3H11V-1Z" fill={fillColor}/>
            <Path d="M12 5H4V7H12V5Z" fill={fillColor}/>
            <Path d="M12 9H4V11H12V9Z" fill={fillColor}/>
        </Svg>
    </View>
);

notes.propTypes = {};
notes.defaultProps = {};

export default notes;
