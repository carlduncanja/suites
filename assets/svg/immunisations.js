import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const immunisations = ({fillColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M12.8 5.10002L13.8 4.10002L14.3 4.60002C14.7 5.00002 15.3 5.00002 15.7 4.60002C16.1 4.20002 16.1 3.60002 15.7 3.20002L12.8 0.300024C12.4 -0.0999756 11.8 -0.0999756 11.4 0.300024C11 0.700024 11 1.30002 11.4 1.70002L11.9 2.20002L10.9 3.20002L7.9 0.200024C7.5 -0.199976 6.9 -0.199976 6.5 0.200024C6.1 0.600024 6.1 1.20002 6.5 1.60002L8.2 3.30002L2.2 9.50002C1.8 9.90002 1.8 10.5 2.2 10.9L3 11.6L0.3 14.3C-0.1 14.7 -0.1 15.3 0.3 15.7C0.7 16.1 1.3 16.1 1.7 15.7L4.4 13L5.1 13.7C5.5 14.1 6.1 14.1 6.5 13.7L12.6 7.60002L14.3 9.30002C14.7 9.70002 15.3 9.70002 15.7 9.30002C16.1 8.90003 16.1 8.30002 15.7 7.90002L12.8 5.10002Z" fill={fillColor}/>
        </Svg>   
    </View>
);

immunisations.propTypes = {};
immunisations.defaultProps = {};

export default immunisations;
