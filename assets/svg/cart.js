import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import {View} from "react-native";

const Cart = ({strokeColor}) => (<View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.5 0.5H3.5V9.5H13.5L15.5 2.5" stroke="#00A9CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4 15.5C4.82843 15.5 5.5 14.8284 5.5 14C5.5 13.1716 4.82843 12.5 4 12.5C3.17157 12.5 2.5 13.1716 2.5 14C2.5 14.8284 3.17157 15.5 4 15.5Z" stroke="#00A9CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M13 15.5C13.8284 15.5 14.5 14.8284 14.5 14C14.5 13.1716 13.8284 12.5 13 12.5C12.1716 12.5 11.5 13.1716 11.5 14C11.5 14.8284 12.1716 15.5 13 15.5Z" stroke="#00A9CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M9.5 0.5V6.5" stroke="#00A9CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M6.5 3.5H12.5" stroke="#00A9CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    </View>
);

Cart.propTypes = {};
Cart.defaultProps = {};

export default Cart;
