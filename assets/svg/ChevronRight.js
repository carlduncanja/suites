import React from 'react';
import {View} from 'react-native'
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg'
import PropTypes from 'prop-types';

function ChevronRight({strokeColor = 'white'}) {
    return (
        <View>
            <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G clip-path="url(#clip0)">
                    <Path d="M9.70708 5.293L4.70708 0.293003C4.51848 0.110845 4.26588 0.0100503 4.00368 0.0123288C3.74148 0.0146072 3.49067 0.119776 3.30526 0.305184C3.11985 0.490592 3.01469 0.741405 3.01241 1.0036C3.01013 1.2658 3.11092 1.5184 3.29308 1.707L7.58608 6L3.29308 10.293C3.19757 10.3853 3.12139 10.4956 3.06898 10.6176C3.01657 10.7396 2.98898 10.8708 2.98783 11.0036C2.98668 11.1364 3.01198 11.2681 3.06226 11.391C3.11254 11.5139 3.18679 11.6255 3.28069 11.7194C3.37458 11.8133 3.48623 11.8875 3.60913 11.9378C3.73202 11.9881 3.8637 12.0134 3.99648 12.0123C4.12926 12.0111 4.26048 11.9835 4.38249 11.9311C4.50449 11.8787 4.61483 11.8025 4.70708 11.707L9.70708 6.707C9.89455 6.51947 9.99987 6.26517 9.99987 6C9.99987 5.73484 9.89455 5.48053 9.70708 5.293Z" fill={strokeColor}/>
                </G>
                <Defs>
                    <ClipPath id="clip0">
                        <Rect width="12" height="12" fill={strokeColor}/>
                    </ClipPath>
                </Defs>
            </Svg>
        </View>
    );
}

ChevronRight.propTypes = {};
ChevronRight.defaultProps = {};

export default ChevronRight;
