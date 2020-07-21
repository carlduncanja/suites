import React from 'react';
import {View, Text, StyleSheet} from 'react-native';    
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming'; 
import Button from '../Buttons/Button';

function OverlayButtonContainer({message = "", button = ()=>{}}){ 

    const theme = useTheme();

    const OverlayButtonWrapper = styled.TouchableOpacity`
        display: flex;
    `;

    const OverlayButtonContainer = styled.View`
        flex-direction : row;
        justify-content : flex-end;
        align-items : center;
    `;
    const Message = styled.Text({
        ...theme.font['--text-base-medium'],
        color : theme.colors['--default-shade-white']
    });

    return (
        <OverlayButtonWrapper onPress = {()=>{}}>
            <OverlayButtonContainer>
                <Message>{message}</Message>
                {button}
            </OverlayButtonContainer>
        </OverlayButtonWrapper>
    )
}

export default OverlayButtonContainer