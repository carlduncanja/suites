import React, {Component, useContext, useState} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {View} from 'react-native-animatable';
import {isEmpty} from 'lodash';
import {Text} from 'react-native';
import Button from '../Buttons/Button';
import SmallLeftTriangle from '../../../../assets/svg/smallLeftTriangle';
import {PageContext} from '../../../contexts/PageContext';
import SvgIcon from '../../../../assets/SvgIcon';
import LockIcon from '../../../../assets/svg/lockIcon';
import EditLockIcon from '../../../../assets/svg/editLockedIcon';
import DeleteIcon from '../../../../assets/svg/wasteIcon';
import MultipleShadowsContainer from '../MultipleShadowContainer';

function PageHeader({
                        onBack,
                        isArchive: isEditDisabled = false,
                        headerChildren = [],
                        separator = null,
                        updatePhysician,
                        inventoryUpdate,
                        updateStorage,
                        inventoryVariantUpdate,
                        editMessage = 'now in edit mode'
                    }) {
    const theme = useTheme();

    const {pageState, setPageState} = useContext(PageContext);

    const onEditPress = () => {
        if (locked) {
            // todo show user locked messaged
            return;
        }

        setPageState({
            ...pageState,
            isEditMode: !pageState.isEditMode
        });
    };

    const {isEditMode, isReview, locked, editMsg, editDisabled} = pageState;

    const buttonProps = !isEditMode ?
        {
            backgroundColor: theme.colors['--accent-button'],
            color: theme.colors['--default-shade-white'],
            title: 'Edit',
        } :
        {
            backgroundColor: theme.colors['--default-shade-white'],
            color: isReview ? theme.colors['--color-gray-600'] : theme.colors['--accent-button'],
            title: 'Done',
        };

    const showIcon = () => (
        <SvgIcon iconName="doctorArrow" strokeColor="#718096"/>
    );

    const getButtonProps = () => {
        const editModeProps = {
            backgroundColor: theme.colors['--default-shade-white'],
            color: isReview ? theme.colors['--color-gray-600'] : theme.colors['--accent-button'],
            title: 'Done',
        };

        const defaultProps = {
            backgroundColor: theme.colors['--accent-button'],
            color: theme.colors['--default-shade-white'],
            title: 'Edit',
        };

        const lockedProps = {
            backgroundColor: theme.colors['--color-gray-400'],
            color: theme.colors['--color-gray-600'],
            title: 'Edit',
        };

        const editDisabled = {
            backgroundColor: theme.colors['--default-shade-white'],
            color: theme.colors['--color-gray-500'],
            title: 'Edit',
        };

        console.log('is locked', locked);

        if (locked) {
            return lockedProps;
        }
        if (isEditMode) {
            return editModeProps;
        }
        if (isEditDisabled) {
            return editDisabled;
        }
        return defaultProps;
    };

    const getEditBtnBackground = () => {
        const defaultColor = theme.colors['--accent-button'];
        const editMode = theme.colors['--default-shade-white'];
        const lockedBackground = theme.colors['--color-gray-400'];
        const disabled = theme.colors['--default-shade-white'];

        if (locked) {
            return lockedBackground;
        }
        if (isEditMode) {
            return editMode;
        }
        if (isEditDisabled) {
            return disabled;
        }
        return defaultColor;
    };

    const editColor = isReview ? theme.colors['--color-gray-600'] : theme.colors['--accent-button'];

    return (
        <MultipleShadowsContainer shadows={shadows} hasShadow={isEditMode ? true : false}>

            <HeaderWrapper theme={theme} isEditMode={isEditMode} isEditBackground={editColor}>
                <HeaderContainer theme={theme}>

                    {
                        !isEditMode &&
                        <IconContainer theme={theme} onPress={onBack}><SmallLeftTriangle/></IconContainer>
                    }

                    {
                        !isEditMode &&

                        <TextContainer>
                            {
                                headerChildren.map((item, index) => {
                                    const lastItem = (index === headerChildren.length - 1);

                                    return lastItem
                                        ? <HeaderText
                                            key={index}
                                            theme={theme}
                                            numberOfLines={1}
                                            ellipsizeMode='tail'
                                            >{item}</HeaderText>
                                        : (
                                            <React.Fragment key={index}>
                                                <SpecialText
                                                    theme={theme}
                                                > {item}</SpecialText>
                                                <View style={{marginLeft: 15, marginRight: 10}}>
                                                    {separator}
                                                </View>
                                            </React.Fragment>
                                        );
                                })
                            }
                        </TextContainer>

                    }

                    {
                        isEditMode &&
                        <EditModeContainer theme={theme} isReview={isReview}>
                            {editMsg || editMessage}
                        </EditModeContainer>
                    }

                   { (updatePhysician || inventoryUpdate || inventoryVariantUpdate || updateStorage) && <EditButtonWrapper theme={theme}>
                        <EditButtonContainer
                            theme={theme}
                            backgroundColor={getEditBtnBackground()}
                            hasBorder={isEditDisabled}
                        >
                            <Button
                                {...getButtonProps()}
                                buttonPress={onEditPress}
                                disabled={!isEditDisabled ? locked : true}
                                font={theme.font['--text-sm-medium']}
                                Icon={locked && <EditLockIcon/>}
                            />

                        </EditButtonContainer>
                    </EditButtonWrapper>
                    }

                    {/* {
                        !isEditDisabled ? (
                            <EditButtonWrapper theme={theme}>
                                <EditButtonContainer
                                    theme={theme}
                                    backgroundColor={getEditBtnBackground()}
                                >
                                    <Button
                                        {...getButtonProps()}
                                        buttonPress={onEditPress}
                                        disabled={locked}
                                        font={theme.font['--text-sm-medium']}
                                        Icon={locked && <EditLockIcon/>}
                                    />

                                </EditButtonContainer>
                            </EditButtonWrapper>
                        ) : (
                            <DisabledEditContainer>
                                <DisabledText>Edit</DisabledText>
                            </DisabledEditContainer>

                        )} */}
                </HeaderContainer>
            </HeaderWrapper>

        </MultipleShadowsContainer>
    );
}

const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0.2,
        height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 3,
};

const HeaderWrapper = styled.View(({isEditMode, theme, isEditBackground}) => ({
    display: 'flex',
    height: 55,
    // ...(isEditMode ? shadow : {}),
    backgroundColor: isEditMode ?
        isEditBackground :
        theme.colors['--default-shade-white'],
}));

const HeaderContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const TextContainer = styled.View`
  flex: 1;
  margin-right: ${({theme}) => theme.space['--space-14']};
  margin-left: ${({theme}) => theme.space['--space-14']};
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.Text`
  font: ${({theme}) => theme.font['--text-xl-medium']};
  color: ${({theme}) => theme.colors['--accent-button']};
  flex: 1;
`;

const IconContainer = styled.TouchableOpacity`
  margin-left: 10px;
`;

const SpecialText = styled.Text`
  margin-left: 8px;
  font: ${({theme}) => theme.font['--text-sm-medium']};
  color: ${({theme}) => theme.colors['--company']};
`;

const EditButtonWrapper = styled.View`
  height: 26px;
  width: 56px;
  margin-right: 10px;
`;

const EditButtonContainer = styled.View`
  height: 100%;
  //width: 100%; 
  flex-direction: row;
  border-radius: 6px;
  padding: 4px;

  background-color: ${({backgroundColor}) => backgroundColor};
  border: ${({theme, hasBorder}) => hasBorder && `1px solid ${theme.colors['--color-gray-300']}`};
  align-items: center;
  justify-content: center;
`;

const DisabledEditContainer = styled.View`
  background-color: ${({theme}) => theme.colors['--default-shade-white']};
  height: 26px;
  width: 53px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px #E3E8EF;
`;

const DisabledText = styled.Text`
  color: #A0AEC0;
`;

const EditModeContainer = styled.Text(({theme, isReview}) => ({
    ...theme.font['--text-base-medium'],
    color: theme.colors['--color-white'],
    alignItems: 'center',
    textAlign: 'center'
}));

const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 0},
        shadowOpacity: 0.06,
        shadowRadius: 4
    },
    {
        shadowColor: 'black',
        shadowOffset: {width: 4, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 6
    },
]

export default PageHeader;
