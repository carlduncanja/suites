import React, { useContext } from 'react';
import Button from "../Buttons/Button";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

function DoneButton({onPress = ()=>{}}){

    const theme = useTheme();

    const DoneButtonWrapper = styled.View`
        height : 26px;
        width : 53px;
    `;
    const DoneButtonContainer = styled.View`
        height: 100%;
        width: 100%;
        border-radius : 6px;
        padding-top : 6px;
        padding-bottom : 6px;
        padding-left: 8px;
        padding-right: 8px;
        background-color : ${theme.colors['--default-shade-white']};
        align-items : center;
        justify-content : center;
    `
    return( 
        <DoneButtonWrapper>
            <DoneButtonContainer>
                <Button
                    backgroundColor="#FFFFFF" 
                    color="#0CB0E7"
                    title="Edit"
                    onPress={onPress}
                />
            </DoneButtonContainer>
        </DoneButtonWrapper>
        
    )
}

export default DoneButton
