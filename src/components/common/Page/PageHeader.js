import React, { Component, useState } from 'react';
import styled, { css } from "@emotion/native";
import { useTheme } from "emotion-theming";
import Button from "../../common/Buttons/Button";
import SmallLeftTriangle from "../../../../assets/svg/smallLeftTriangle";

function PageHeader({ onBack, headerMessage = "User", specialDetail = "(200 items)", isOpenEditable = false }) {
    const theme = useTheme();

    const [isEditMode, setEditMode] = useState(isOpenEditable);

    const HeaderWrapper = styled.View`
    display:flex;
    height:55px;
    padding:1px;
    background-color:${theme.colors["--default-shade-white"]};
    
    `;

    const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top:5px;
    padding-left: 0px;
    padding-top: 8px;
    padding-right: 0px;
    padding-bottom: 8px;
    `;



    const TextContainer = styled.View`
    align-self:center;
    flex-direction: row;
    align-items:baseline;
    `;

    const HeaderText = styled.Text`
   
    font:${theme.font["--text-xl-medium"]};
    color:${theme.colors["--accent-button"]};
  `;

    const GeneralText = styled.Text`
  font:${theme.font["--text-sm-medium"]};
    align-self:center;
    font-weight: bold;
    color:${theme.colors["--default-shade-white"]};
  `;

    const IconContainer = styled.TouchableOpacity`
        margin-left:10px;
        align-self:flex-start;
    `;

    const SpecialText = styled.Text`
    font:${theme.font["--text-sm-medium"]};
    color:${theme.colors["--company"]};
  
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
  padding-top : 6px;
  padding-bottom : 6px;
  padding-left: 8px;
  padding-right: 8px;
  background-color : ${theme.colors['--accent-button']};
  align-items : center;
  justify-content : center;
`


    return (
        <HeaderWrapper>
            <HeaderContainer>
                <IconContainer onPress={onBack}><SmallLeftTriangle /></IconContainer>
                <TextContainer>
                    <HeaderText>{headerMessage}</HeaderText>
                    <SpecialText>{specialDetail}</SpecialText>
                </TextContainer>
                <EditButtonWrapper>
                    <EditButtonContainer>
                        <Button
                            backgroundColor="#0CB0E7"
                            color="#FFFFFF"
                            title="Edit"

                        />
                    </EditButtonContainer>
                </EditButtonWrapper>


            </HeaderContainer>
        </HeaderWrapper>
    )





}

export default PageHeader;