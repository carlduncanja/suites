import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import { View } from 'react-native';

const overlayMedicalStaffSelected = () => (
    <View>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M19.1667 5.83333H14.1667V0.833333C14.1667 0.333333 13.8333 0 13.3333 0H6.66667C6.16667 0 5.83333 0.333333 5.83333 0.833333V5.83333H0.833333C0.333333 5.83333 0 6.16667 0 6.66667V13.3333C0 13.8333 0.333333 14.1667 0.833333 14.1667H5.83333V19.1667C5.83333 19.6667 6.16667 20 6.66667 20H13.3333C13.8333 20 14.1667 19.6667 14.1667 19.1667V14.1667H19.1667C19.6667 14.1667 20 13.8333 20 13.3333V6.66667C20 6.16667 19.6667 5.83333 19.1667 5.83333Z" fill="#E53E3E"/>
        </Svg>
    </View>
    
)

overlayMedicalStaffSelected.propTypes = {};
overlayMedicalStaffSelected.defaultProps = {};

export default overlayMedicalStaffSelected