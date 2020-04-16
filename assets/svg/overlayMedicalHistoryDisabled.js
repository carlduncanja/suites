import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import { View } from 'react-native';

const overlayMedicalHistoryDisabled = () => (
    <View>
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M20 14H2V5H0V19C0 19.7956 0.31607 20.5587 0.87868 21.1213C1.44129 21.6839 2.20435 22 3 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5H20V14Z" fill="#CCD6E0"/>
            <Path d="M5 2H17V13H19V1C19 0.734784 18.8946 0.48043 18.7071 0.292893C18.5196 0.105357 18.2652 0 18 0H4C3.73478 0 3.48043 0.105357 3.29289 0.292893C3.10536 0.48043 3 0.734784 3 1V13H5V2Z" fill="#E3E8EF"/>
            <Path d="M15 5H7V7H15V5Z" fill="#E3E8EF"/>
            <Path d="M15 9H7V11H15V9Z" fill="#E3E8EF"/>
        </Svg> 
    </View>
    
)

overlayMedicalHistoryDisabled.propTypes = {};
overlayMedicalHistoryDisabled.defaultProps = {};

export default overlayMedicalHistoryDisabled