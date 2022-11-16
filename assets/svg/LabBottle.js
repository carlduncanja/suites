import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const LabBottle = ({fillColor}) => (<View>
        <Svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M13.9586 12.7L9.65864 7.6V4H10.6586C11.2586 4 11.6586 3.6 11.6586 3V1C11.6586 0.4 11.2586 0 10.6586 0H4.65864C4.05864 0 3.65864 0.4 3.65864 1V3C3.65864 3.6 4.05864 4 4.65864 4H5.65864V7.6L1.35864 12.7C0.858643 13.3 0.758643 14.1 1.05864 14.8C1.35864 15.5 2.05864 16 2.85864 16H12.5586C13.3586 16 14.0586 15.6 14.3586 14.8C14.6586 14.1 14.5586 13.3 13.9586 12.7Z" fill="#9F7AEA"/>
        </Svg>
    </View>
);

LabBottle.propTypes = {};
LabBottle.defaultProps = {};

export default LabBottle;