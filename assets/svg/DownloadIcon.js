import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {View} from 'react-native';

const DownloadIcon = ({strokeColor}) => (
    <View>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M3.5 6.5L8 11.5L12.5 6.5H9.5V0.5H6.5V6.5H3.5Z"
                stroke="#3182CE"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M15.5 10.5V14.5C15.5 15.052 15.052 15.5 14.5 15.5H1.5C0.948 15.5 0.5 15.052 0.5 14.5V10.5"
                stroke="#3182CE"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    </View>
);

DownloadIcon.propTypes = {};
DownloadIcon.defaultProps = {};

export default DownloadIcon;
