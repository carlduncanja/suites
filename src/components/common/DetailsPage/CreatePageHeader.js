import React, { useState } from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from "emotion-theming";
import Button from '../Buttons/Button';

const HeaderWrapper = styled.View`
    display: flex;
    height: 47px;
    width: 100%;
    padding-left: ${({ theme }) => theme.space['--space-24']};
    padding-right: ${({ theme }) => theme.space['--space-10']};
    /* background-color : yellow; */
`;

const HeaderContainer = styled.View`
    height : 100%;
    width  : 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* background-color : green; */
`

const HeaderText = styled.Text`
    font:${({ theme }) => theme.font["--text-xl-medium"]};
    color:${({ theme }) => theme.colors["--company"]};
`;

const CloseButtonContainer = styled.View`
    height : 26px;
    width : 64px;
    background-color : ${({ theme }) => theme.colors["--color-gray-300"]};
    align-items : center;
    justify-content : center;
    border-radius : 6px;
`
function CreatePageHeader({ title = "", onClose = () => { } }) {

    const theme = useTheme();

    return (
        <HeaderWrapper theme={theme}>
            <HeaderContainer theme={theme}>
                <HeaderText theme={theme}>{title}</HeaderText>
                <CloseButtonContainer theme={theme}>
                    <Button
                        backgroundColor="--color-gray-300"
                        buttonPress={onClose}
                        color={theme.colors["--color-gray-600"]}
                        title="Close"
                        font='--text-sm-bold'
                    />
                </CloseButtonContainer>
            </HeaderContainer>
        </HeaderWrapper>
    )
}

CreatePageHeader.propTypes = {};
CreatePageHeader.defaultProps = {};

export default CreatePageHeader