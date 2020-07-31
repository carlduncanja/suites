import React, {useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from "react-native";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function ShadowContainerComponent({isOpen = false}){

    const theme = useTheme();

    const ShadowWrapper = styled.TouchableWithoutFeedback`
        margin : 0;
    `;

    const ShadowContainer = styled.View`
        position : absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity : 0.3;
        background-color: ${theme.colors['--color-neutral-gray-900']};
    `;

    return (
        <ShadowWrapper>
            <ShadowContainer
                pointerEvents={isOpen ? 'auto' : 'none'}
            />
        </ShadowWrapper>
    )
}

export default ShadowContainerComponent
