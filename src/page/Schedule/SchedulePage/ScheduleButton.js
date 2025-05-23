import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import Button from '../../../components/common/Buttons/Button';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function ScheduleButton({ title = '', onButtonPress = () => { }, color }) {

    const theme = useTheme();

    // borderColor: '#CCD6E0',
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: "#FFFFFF"

    const ScheduleButtonWrapper = styled.View`
        height: 25px;
        width: 95px;
    `
    const ScheduleButtonContainer = styled.View`
        display: flex;
        height: 100%;
        width: 100%;
        background-color: ${theme.colors['--default-shade-white']};
        border-color: ${theme.colors['--color-gray-400']};
        border-radius: 4px;
        border-width: 1px;
    `
    return (
        <ScheduleButtonWrapper>
            <ScheduleButtonContainer>
                <Button
                    title={title}
                    buttonPress={onButtonPress}
                    color={theme.colors['--color-gray-700']}
                />
            </ScheduleButtonContainer>
        </ScheduleButtonWrapper>
    )
}

export default ScheduleButton
