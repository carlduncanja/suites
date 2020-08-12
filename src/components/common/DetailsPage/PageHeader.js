import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from "emotion-theming";
import {Button} from "react-native";
import styled from "@emotion/native";
import EditButtonStyle from "../OverlayButtons/EditButtonStyle";
import {DoneButton} from "../OverlayButtons/OverlayButtonStyles";
import {PageContext} from "../../../contexts/PageContext";

function PageHeader({
                        title = "",
                        subTitle = "",
                        // isEditMode = true,
                        onBackPress = () => {
                        },
                        // onEditPress = () => {
                        // },
                        ...props
                    }) {
    const {isEditMode, setEditMode} = useContext(PageContext)


    const onEditPress = () => {setEditMode(!isEditMode)}

    const theme = useTheme();

    const PageHeaderWrapper = styled.View`
        height : 52px;
        background-color : ${isEditMode ? theme.colors['--accent-button'] : theme.colors['--color-white']};
        padding : ${theme.space['--space-12']};
    `
    const PageHeaderContainer = styled.View`
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    `

    const TitleWrapper = styled.View`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `

    const TitleContainer = styled.Text({
        ...theme.font['--text-xl-medium'],
        color: theme.colors['--accent-button'],
        alignItems: 'center',
        textAlign: 'center'
    })

    const SubTileContainer = styled.Text({
        ...theme.font['--text-sm-medium'],
        color: theme.colors['--company'],
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 8
    })

    const EditModeContainer = styled.Text({
        ...theme.font['--text-base-medium'],
        color: theme.colors['--color-white'],
        alignItems: 'center',
        textAlign: 'center'
    })

    return (
        <PageHeaderWrapper>
            <PageHeaderContainer>
                {
                    !isEditMode &&
                    <>
                        <Button onPress={onBackPress} title={"back"}/>
                        <TitleWrapper>
                            <TitleContainer>{title} </TitleContainer>
                            <SubTileContainer>{subTitle}</SubTileContainer>
                        </TitleWrapper>
                    </>
                }

                {
                    isEditMode &&
                    <EditModeContainer>
                        now in edit mode
                    </EditModeContainer>
                }

                {
                    !isEditMode
                        ? <EditButtonStyle onPress={onEditPress} title={"Edit"}/>
                        : <DoneButton onPress={onEditPress}/>
                }

            </PageHeaderContainer>
        </PageHeaderWrapper>
    );
}

PageHeader.propTypes = {};
PageHeader.defaultProps = {};

export default PageHeader;
