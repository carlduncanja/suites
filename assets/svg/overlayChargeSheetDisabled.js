import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import { View } from 'react-native';

const overlayChargeSheetDisabled = () => (
    <View>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M19.1667 13.3333H0.833333C0.3725 13.3333 0 13.7058 0 14.1666V19.1666C0 19.6275 0.3725 20 0.833333 20H19.1667C19.6275 20 20 19.6275 20 19.1666V14.1666C20 13.7058 19.6275 13.3333 19.1667 13.3333ZM5 17.5H2.5V15.8333H5V17.5ZM17.5 17.5H8.33333V15.8333H17.5V17.5Z" fill="#CCD6E0"/>
            <Path d="M3.33333 5V11.6667H16.6667V2.91667C16.6667 1.30833 15.3583 0 13.75 0H2.91667C1.30833 0 0 1.30833 0 2.91667V4.16667C0 4.6275 0.3725 5 0.833333 5H3.33333ZM1.66667 2.91667C1.66667 2.2275 2.2275 1.66667 2.91667 1.66667H11.115C10.9342 2.04583 10.8333 2.47 10.8333 2.91667V3.33333H1.66667V2.91667Z" fill="#E3E8EF"/>
        </Svg>
    </View>
    
)

overlayChargeSheetDisabled.propTypes = {};
overlayChargeSheetDisabled.defaultProps = {};

export default overlayChargeSheetDisabled