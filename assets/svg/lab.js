import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const lab = ({fillColor}) => (<View>
        <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M14 14H0V16H14V14Z" fill={fillColor}/>
            <Path d="M14 13H6V16H14V13Z" fill={fillColor}/>
            <Path d="M4.54379 12.1163C4.54379 10.8637 3.52447 9.84438 2.27189 9.84438H1.5146C1.5146 8.17529 2.2772 6.64933 3.57672 5.64894L6.49383 9.73684C6.73162 10.0701 7.20191 10.1602 7.55026 9.91329L10.016 8.15409C10.3561 7.91099 10.4356 7.43844 10.1925 7.0969L5.3541 0.316807C5.11176 -0.0224627 4.63845 -0.101979 4.29842 0.140356L1.8319 1.89956C1.49188 2.1419 1.41236 2.61596 1.65545 2.95599L2.69901 4.41909C1.00039 5.70347 0 7.67926 0 9.84438V10.6017V15.1455H4.54379V12.1163Z" fill={fillColor}/>
        </Svg>
    </View>
);

lab.propTypes = {};
lab.defaultProps = {};

export default lab;
