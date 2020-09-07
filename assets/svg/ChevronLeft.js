import React from 'react';
import {View} from 'react-native'
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg'
import PropTypes from 'prop-types';

function ChevronLeft({strokeColor = 'white'}) {
    return (
        <View>
            <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G clip-path="url(#clip0)">
                    <Path d="M2.29304 5.293L7.29304 0.293003C7.48164 0.110845 7.73425 0.0100503 7.99644 0.0123288C8.25864 0.0146072 8.50945 0.119776 8.69486 0.305184C8.88027 0.490592 8.98544 0.741405 8.98771 1.0036C8.98999 1.2658 8.8892 1.5184 8.70704 1.707L4.41404 6L8.70704 10.293C8.80255 10.3853 8.87873 10.4956 8.93114 10.6176C8.98355 10.7396 9.01114 10.8708 9.01229 11.0036C9.01345 11.1364 8.98814 11.2681 8.93786 11.391C8.88758 11.5139 8.81333 11.6255 8.71944 11.7194C8.62554 11.8133 8.51389 11.8875 8.39099 11.9378C8.2681 11.9881 8.13642 12.0134 8.00364 12.0123C7.87086 12.0111 7.73964 11.9835 7.61764 11.9311C7.49563 11.8787 7.38529 11.8025 7.29304 11.707L2.29304 6.707C2.10557 6.51947 2.00025 6.26517 2.00025 6C2.00025 5.73484 2.10557 5.48053 2.29304 5.293Z" fill={strokeColor}/>
                </G>
                <Defs>
                    <ClipPath id="clip0">
                        <Rect width="12" height="12" fill={strokeColor} transform="matrix(-1 0 0 1 12 0)"/>
                    </ClipPath>
                </Defs>
            </Svg>
        </View>
    );
}

ChevronLeft.propTypes = {};
ChevronLeft.defaultProps = {};

export default ChevronLeft;
