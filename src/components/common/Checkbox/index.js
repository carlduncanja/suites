import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from "react-native";
import Svg, {Path} from "react-native-svg";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';


const tickSVG = (<Svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
        d="M9.4001 1.99998L8.0001 0.599976L4.0001 4.59998L2.0001 2.59998L0.600098 3.99998L4.0001 7.39998L9.4001 1.99998Z"
        fill="#48BB78"/>
</Svg>);

const indeterminateSvg = <Svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M8 2H0V0H8V2Z" fill="#718096"/>
</Svg>;

function CheckBoxComponent({isCheck, isIndeterminate, onPress}) { 

    const theme = useTheme()
     
    const CheckboxWrapper = styled.TouchableOpacity`
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 19px;
        padding-bottom: 19px;
        justify-content: center;
        align-items: center;
   
    `
    const CheckboxContainer = styled.View`
        background-color: ${theme.colors['--color-gray-100']};
        border-color: ${theme.colors['--color-gray-400']};
        border-width: 1px;
        border-radius: 4px;
        height: ${theme.space['--space-16']};
        width: ${theme.space['--space-16']};
        align-items: center;
        justify-content: center;
    `
    return (

        <CheckboxWrapper onPress = {onPress} activeOpacity = {0.8}>
            <CheckboxContainer>
                {
                    isIndeterminate
                        ? indeterminateSvg
                        : isCheck
                            ? tickSVG
                            : <View/>
                }
            </CheckboxContainer>
        </CheckboxWrapper>
    );
}

CheckBoxComponent.propTypes = {};
CheckBoxComponent.defaultProps = {};

export default CheckBoxComponent;
