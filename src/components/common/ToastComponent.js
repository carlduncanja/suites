import React, { useState } from 'react';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import RemoveIcon from '../../../assets/svg/remove2';

import MultipleShadowsContainer from './MultipleShadowContainer';
import IconButton from '../common/Buttons/IconButton';


const ToastWrapper = styled.View`
    width: 636px;
    height: 48px;
    position: absolute;
    bottom: 20;
`;

const ToastContainer = styled.View`
    height: 100%;
    width: 100%;
    background-color: ${({theme, backgroundColor}) => theme.colors[backgroundColor]};
    border: ${({theme, borderColor}) => `1px solid ${theme.colors[borderColor]}`};
    border-radius: 8px;
    padding-left: ${({theme}) => theme.space['--space-24']};
    padding-bottom:0;
    padding-top:0;
    justify-content:space-between;
    flex-direction: row;
    align-items:center;
`;

const ToastMessage = styled.Text(({theme, color = "--color-blue-600"}) => ({
    ...theme.font['--text-xs-medium'],
    color: theme.colors[color],
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
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 4
    },
    {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6
    },
];

const ToastComponent = ({backgroundColor = "--color-blue-100", borderColor = "--color-blue-600", message = "It seems you have lost your internet connection. Some features may not work as expected."}) => {
    const theme = useTheme();

    const [isDisplay, setIsDispay] = useState(true);
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
