import React, { useContext } from 'react';
import Button from "../Buttons/Button";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

function EditButtonStyle({onPress = ()=>{}}){

    const theme = useTheme();

    const press = ()=>{
        console.log("Press")
    }

    const EditButtonWrapper = styled.View`
        height : 26px;
        width : 53px;
        align-content: center;
        justify-content: center;
    `;

    const EditButtonContainer = styled.View`
        height: 100%;
        width: 100%; 
        border-radius : 6px;
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
                    buttonPress={onPress}
                />
            </EditButtonContainer>
        </EditButtonWrapper>

    )
}

export default EditButtonStyle
