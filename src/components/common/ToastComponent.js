import React, { useState } from 'react';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import RemoveIcon from '../../../assets/svg/remove2';

import MultipleShadowsContainer from './MultipleShadowContainer';
import IconButton from '../common/Buttons/IconButton';


const ToastWrapper = styled.View`
    width: 100%;
    height: 48px;
`;

const ToastContainer = styled.View`
    height: 100%;
    width: 100%;
    background-color: ${({theme, backgroundColor}) => theme.colors[backgroundColor]};
    border: ${({theme, borderColor}) => `1px solid ${theme.colors[borderColor]}`};
    border-radius: 8px;
    border-color: transparent;
    padding: 18px;
    padding-bottom:0;
    padding-top:0;
    justify-content:space-between;
    flex-direction: row;
    align-items:center;
`;

const ToastMessage = styled.Text(({theme, color = "--color-blue-600"}) => ({
    color: theme.colors[color],
    fontSize: '14px'
}));

const IconContainer = styled.View`
    flex:1;
    height:100%;
    align-items: flex-end;
    justify-content:center;
`;

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0,
        shadowRadius: 4
    },
    {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.19,
        shadowRadius: 5,
    },
];

const ToastComponent = ({isDisplay = false, setIsDispay, backgroundColor = "--color-blue-100", borderColor = "--color-blue-600", message = "Oops! Please check your internet connection."}) => {
    const theme = useTheme();

    return (
        isDisplay &&
        <ToastWrapper>
            <MultipleShadowsContainer shadows={shadows}>
                <ToastContainer theme={theme} backgroundColor={backgroundColor} borderColor={borderColor}>
                    <ToastMessage>{message}</ToastMessage>
                    <IconContainer theme={theme}>
                        <IconButton
                            Icon={<RemoveIcon strokeColor={theme.colors['--color-blue-600']}/>}
                            onPress={() => setIsDispay(false)}
                            disabled={false}
                        />
                    </IconContainer>
                    
                </ToastContainer>
            </MultipleShadowsContainer>
        </ToastWrapper>
    );
};

export default ToastComponent;
