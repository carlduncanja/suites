import React, {useState} from 'react';
import {Switch} from 'react-native';
import {useTheme} from 'emotion-theming';
import styled, {css} from '@emotion/native';

const SuitesSwitch = styled.Switch`
  padding: 0;
`;

function CustomSwitch({
    isChecked = false,
    onChange = () => {
    }
}) {
    const theme = useTheme();

    return <SuitesSwitch
        style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
        theme={theme}
        trackColor={{true: theme.colors['--color-blue-600'], false: theme.colors['--color-gray-600']}}
        value={isChecked}
        onValueChange={onChange}
    />;
}

export default CustomSwitch;
