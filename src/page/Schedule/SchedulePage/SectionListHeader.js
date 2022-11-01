import React, {useEffect, useRef, useState} from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SectionListHeader({title = "", onNewProcedureClick}){
    const theme = useTheme();

    const SectionListHeaderWrapper = styled.View`
        margin-bottom : 0px;
    `;
    
    const SectionListHeaderContainer = styled.View`
        height : 50px;
        width: 100%;
        margin-bottom: 10px;
        paddingBottom: 5px;
        paddingTop: 24px;
        border-bottom-color: theme.colors['--color-gray-600'];;
        border-bottom-width: 1px;
        flex-direction: row;
        display: flex;
        background-color: white;
    `;

    const SectionListHeaderTitle = styled.Text({
        ...theme.font['--text-sm-bold'],
        color: theme.colors['--color-gray-700'],
        flex: 2
    });

    const ButtonContainer = styled.View`
        width:70%;
        height:100%;
        flex: 1;
        display: flex;
        flexDirection: row;
        margin-right:30;
    `;

    const NewProcedureButton = styled.TouchableOpacity`
        align-items:center;
        border-width:1px;
        justify-content:center;
        border-color:${({ theme }) => theme.colors["--color-blue-700"]};
        width:110px;
        height:22px;
        border-radius:3px;
        margin-left: 90px;
    `;

    const NewProcedureButtonText = styled.Text`
        align-items: center; 
        alidn-self:center;
        color: ${({ theme }) => theme.colors["--color-blue-600"]};
        font:${({ theme }) => theme.font["--text-sm-regular"]};
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
