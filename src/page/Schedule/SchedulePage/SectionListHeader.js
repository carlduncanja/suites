import React, {useEffect, useRef, useState} from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SectionListHeader({title = "", onNewProcedureClick}){
    const theme = useTheme();

    const SectionListHeaderWrapper = styled.View`
        margin-bottom : 0px;
    `;
    
    const SectionListHeaderContainer = styled.View`
        height : 70px;
        width: 100%;
        border-bottom-color: theme.colors['--color-gray-600'];;
        border-bottom-width: 1px;
        flex-direction: row;
        display: flex;
        background-color: white;
    `;

    const SectionListHeaderTitle = styled.Text({
        ...theme.font['--text-sm-bold'],
        color: theme.colors['--color-gray-700'],
        flex: 2,
        alignSelf: 'center'
    });

    const ButtonContainer = styled.View`
        width:70%;
        height:100%;
        flex: 1;
        display: flex;
        flexDirection: row;
        align-items: center;
        justify-content: flex-end;
    `;

    const NewProcedureButton = styled.TouchableOpacity`
        border-width:1px;
        border-color:${({ theme }) => theme.colors["--color-blue-700"]};
        width:110px;
        height:24px;
        border-radius:3px;
        justify-content:center;
        align-items:center;
    `;

    const NewProcedureButtonText = styled.Text`
        color: ${({ theme }) => theme.colors["--color-blue-600"]};
        font:${({ theme }) => theme.font["--text-sm-regular"]};
        align-items: center; 
        align-self:center;
    `;

    return (
        <SectionListHeaderWrapper>
            <SectionListHeaderContainer>
                <SectionListHeaderTitle>{title}</SectionListHeaderTitle>
                
                <ButtonContainer>
                    <NewProcedureButton theme={theme} onPress={() => onNewProcedureClick()}>
                        <NewProcedureButtonText>New Procedure</NewProcedureButtonText>
                    </NewProcedureButton>
                </ButtonContainer>

            </SectionListHeaderContainer>
        </SectionListHeaderWrapper>

    )
}

export default SectionListHeader
