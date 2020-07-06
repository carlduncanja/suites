import React from 'react';
import Svg, {Path, Rect} from "react-native-svg";
import { View } from 'react-native';

const overlayProcedureDisabled = () => (
    <View>
        <Svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9.46472 8.12097L0.292722 17.293C-0.00727847 17.593 -0.0852785 18.05 0.0987215 18.433C0.266722 18.782 0.618722 19 0.999722 19C1.03672 19 1.07372 18.998 1.11072 18.994L10.1107 17.994C10.6167 17.937 10.9997 17.51 10.9997 17V13.414L12.8787 11.535L9.46472 8.12097Z" fill="#CCD6E0"/>
            <Path d="M21.7019 0.921001C20.2169 -0.376999 17.7499 -0.164999 16.3559 1.23C14.3589 3.227 10.8789 6.707 10.8789 6.707L15.5859 11.414C15.7809 11.609 16.0369 11.707 16.2929 11.707C16.5489 11.707 16.8049 11.609 16.9999 11.414L21.7759 6.638C22.4289 5.985 22.8999 5.145 22.9969 4.227C23.1289 2.962 22.6529 1.753 21.7019 0.921001Z" fill="#A0AEC0"/>
        </Svg>   
    </View>
    
)

overlayProcedureDisabled.propTypes = {};
overlayProcedureDisabled.defaultProps = {};

export default overlayProcedureDisabled