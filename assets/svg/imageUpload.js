import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {View} from 'react-native';

const ImageUpload = ({strokeColor}) => (
    <View>
        <Svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M36 46H2C0.895 46 0 45.105 0 44V2C0 0.895 0.895 0 2 0H26L38 12V44C38 45.105 37.105 46 36 46Z" fill="#EDF0F2"/>
            <Path d="M26 0V10C26 11.105 26.895 12 28 12H38L26 0Z" fill="#D3D9DE"/>
            <Path d="M16.5 22C17.8807 22 19 20.8807 19 19.5C19 18.1193 17.8807 17 16.5 17C15.1193 17 14 18.1193 14 19.5C14 20.8807 15.1193 22 16.5 22Z" fill={strokeColor}/>
            <Path d="M27.7679 29.36L22.7679 23.36C22.3879 22.904 21.6119 22.904 21.2319 23.36L17.0409 28.389L14.7999 25.4C14.4229 24.896 13.5769 24.896 13.1999 25.4L10.1999 29.4C9.97193 29.703 9.93593 30.108 10.1049 30.447C10.2739 30.786 10.6209 31 10.9999 31H26.9999C27.3879 31 27.7409 30.775 27.9059 30.424C28.0699 30.073 28.0169 29.658 27.7679 29.36Z" fill={strokeColor}/>
        </Svg>
    </View>
);

ImageUpload.propTypes = {};
ImageUpload.defaultProps = {};

export default ImageUpload;
