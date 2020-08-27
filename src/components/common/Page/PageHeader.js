import React, { Component, useContext, useState } from 'react';
import styled, { css } from "@emotion/native";
import { useTheme } from "emotion-theming";
import Button from "../../common/Buttons/Button";
import SmallLeftTriangle from "../../../../assets/svg/smallLeftTriangle";
import { PageContext } from "../../../contexts/PageContext";
import SvgIcon from "../../../../assets/SvgIcon";
import { View } from 'react-native-animatable';
import { isEmpty } from 'lodash'
import { Text } from 'react-native';


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

const HeaderWrapper = styled.View(({ isEditMode, theme }) =>
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
    flex:1;
    margin-top:${({ isSpecialHeader, theme }) => !isSpecialHeader ? "0px" : `${theme.space['--space-10']}`};
    padding-left: ${ ({ theme }) => theme.space['--space-14']};
    // padding-left:${({ isSpecialHeader }) => !isSpecialHeader ? "0px" : "20px"};
    align-self:${({ isSpecialHeader }) => !isSpecialHeader ? "center" : "baseline"};
    flex-direction: row;
    align-items:${({ isSpecialHeader }) => !isSpecialHeader ? "baseline" : "center"};
`;

const HeaderText = styled.Text`
    margin-bottom:${({ isSpecialHeader }) => !isSpecialHeader ? "0px" : "10px"};
    font:${({ theme }) => theme.font["--text-xl-medium"]};
    color:${({ theme }) => theme.colors["--accent-button"]};
`;

const IconContainer = styled.TouchableOpacity`
    margin-left:10px;
`;

const SpecialText = styled.Text`
    margin-left: 8px;
    font:${({ theme }) => theme.font["--text-sm-medium"]};
    color:${({ theme }) => theme.colors["--company"]};
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
  background-color : ${({ theme, isEditMode }) => isEditMode ? theme.colors['--default-shade-white'] : theme.colors['--accent-button']};
  align-items : center;
  justify-content : center;
`;

const DisabledEditContainer = styled.View`
background-color:${({ theme }) => theme.colors["--default-shade-white"]};
height:26px;
width:53px;
align-items : center;
justify-content : center;
border-radius : 6px;
border:1px #E3E8EF
`;

const DisabledText = styled.Text`
color:#A0AEC0;
`;

const EditModeContainer = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-medium'],
    color: theme.colors['--color-white'],
    alignItems: 'center',
    textAlign: 'center'
}))

function PageHeader({ onBack, title = "User", subTitle = "(200 items)", hasIcon, isSpecialHeader = false, isOpenEditable = false, isArchive = false }) {
    const theme = useTheme();


    const { pageState, setPageState } = useContext(PageContext)

    const onEditPress = () => {
        setPageState({
            ...pageState,
            isEditMode: !pageState.isEditMode
        })
    }

    const { isEditMode } = pageState;

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

    const showIcon = () => {
        return (

            <SvgIcon iconName="doctorArrow" strokeColor="#718096" />

        )
    }


    return (
        <HeaderWrapper theme={theme} isEditMode={isEditMode}>
            <HeaderContainer theme={theme}>


                {
                    !isEditMode && <IconContainer theme={theme} onPress={onBack}><SmallLeftTriangle /></IconContainer>
                }

                {
                    !isEditMode &&
                    <TextContainer theme={theme} isSpecialHeader={isSpecialHeader}>
                        <HeaderText theme={theme} isSpecialHeader={isSpecialHeader}>{title}</HeaderText>
                        {!isEmpty(hasIcon) ? <View style={{ marginLeft: 15, marginRight: 10, marginBottom: 10 }}>
                            {hasIcon}</View> : <View />}
                        <SpecialText theme={theme}>{subTitle}</SpecialText>
                    </TextContainer>
                }

                {
                    isEditMode &&
                    <EditModeContainer theme={theme}>
                        now in edit mode
                    </EditModeContainer>
                }
                {!isArchive ?
                    <EditButtonWrapper theme={theme}>
                        <EditButtonContainer theme={theme} isEditMode={isEditMode}>
                            <Button {...buttonProps} buttonPress={onEditPress} />
                        </EditButtonContainer>
                    </EditButtonWrapper>
                    : <DisabledEditContainer>
                        <DisabledText>Edit</DisabledText>
                    </DisabledEditContainer>
                }
            </HeaderContainer>
        </HeaderWrapper>
    )


}

export default PageHeader;
