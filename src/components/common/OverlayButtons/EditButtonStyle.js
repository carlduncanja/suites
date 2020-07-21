import React, { useContext } from 'react';
import Button from "../Buttons/Button";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

function EditButtonStyle({onPress = ()=>{}}){

    const theme = useTheme();

    const EditButtonWrapper = styled.View`
        height : 26px;
        width : 53px;
    `;
    const EditButtonContainer = styled.View`
        height: 100%;
        width: 100%;
        border-radius : 6px;
        padding-top : 6px;
        padding-bottom : 6px;
        padding-left: 8px;
        padding-right: 8px;
        background-color : ${theme.colors['--accent-button']};
        align-items : center;
        justify-content : center;
    `
    return( 
        <EditButtonWrapper>
            <EditButtonContainer>
                <Button
                    backgroundColor="#0CB0E7" 
                    color="#FFFFFF"
                    title="Edit"
                    onPress={onPress}
                />
            </EditButtonContainer>
        </EditButtonWrapper>
        
    )
}

export default EditButtonStyle
