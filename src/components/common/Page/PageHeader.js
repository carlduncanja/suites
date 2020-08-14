import React, {Component, useContext, useState} from 'react';
import styled, {css} from "@emotion/native";
import {useTheme} from "emotion-theming";
import Button from "../../common/Buttons/Button";
import SmallLeftTriangle from "../../../../assets/svg/smallLeftTriangle";
import {PageContext} from "../../../contexts/PageContext";


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0.2,
        height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 3,
};

const HeaderWrapper = styled.View(({isEditMode, theme}) =>
    ({
        display: 'flex',
        height: 55,
        ...(isEditMode ? shadow : {}),
        backgroundColor: isEditMode ? theme.colors['--accent-button'] : theme.colors['--default-shade-white']
    })
);

const HeaderContainer = styled.View`
    flex:1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
`;


const TextContainer = styled.View`
    align-self:center;
    flex-direction: row;
    align-items:baseline;
`;

const HeaderText = styled.Text`
    font:${({theme}) => theme.font["--text-xl-medium"]};
    color:${({theme}) => theme.colors["--accent-button"]};
`;

const IconContainer = styled.TouchableOpacity`
    margin-left:10px;
`;

const SpecialText = styled.Text`
    margin-left: 8px;
    font:${({theme}) => theme.font["--text-sm-medium"]};
    color:${({theme}) => theme.colors["--company"]};
`;

const EditButtonWrapper = styled.View`
  height : 26px;
  width : 53px;
  margin-right:10px;
`;

const EditButtonContainer = styled.View`
  height: 100%;
  width: 100%; 
  border-radius : 6px;
  padding: 6px 8px;
  background-color : ${({theme, isEditMode}) => isEditMode ? theme.colors['--default-shade-white'] : theme.colors['--accent-button']};
  align-items : center;
  justify-content : center;
`

const EditModeContainer = styled.Text(({theme}) => ({
    ...theme.font['--text-base-medium'],
    color: theme.colors['--color-white'],
    alignItems: 'center',
    textAlign: 'center'
}))

function PageHeader({onBack, title = "User", subTitle = "(200 items)", isOpenEditable = false}) {
    const theme = useTheme();

    const {pageState, setPageState} = useContext(PageContext)

    const onEditPress = () => {
        setPageState({
            ...pageState,
            isEditMode: !pageState.isEditMode
        })
    }

    const {isEditMode} = pageState;

    const buttonProps = !isEditMode
        ? {
            backgroundColor: theme.colors['--accent-button'],
            color: theme.colors['--default-shade-white'],
            title: "Edit",
        }
        : {
            backgroundColor: theme.colors['--default-shade-white'],
            color: theme.colors['--accent-button'],
            title: "Done",
        }


    return (
        <HeaderWrapper theme={theme} isEditMode={isEditMode}>
            <HeaderContainer theme={theme}>


                {
                    !isEditMode && <IconContainer theme={theme} onPress={onBack}><SmallLeftTriangle/></IconContainer>
                }

                {
                    !isEditMode &&
                    <TextContainer theme={theme}>
                        <HeaderText theme={theme}>{title}</HeaderText>
                        <SpecialText theme={theme}>{subTitle}</SpecialText>
                    </TextContainer>
                }

                {
                    isEditMode &&
                    <EditModeContainer theme={theme}>
                        now in edit mode
                    </EditModeContainer>
                }

                <EditButtonWrapper theme={theme}>
                    <EditButtonContainer theme={theme} isEditMode={isEditMode}>
                        <Button {...buttonProps} buttonPress={onEditPress}/>
                    </EditButtonContainer>
                </EditButtonWrapper>

            </HeaderContainer>
        </HeaderWrapper>
    )


}

export default PageHeader;
