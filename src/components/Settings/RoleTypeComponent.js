import React, {useState} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import CheckBoxComponent from '../common/Checkbox';

const RoleWrapper = styled.View`
    display: flex;
`;

const RoleContainer = styled.View`
    display : flex;
    flex-direction: column;
    background-color: ${({theme, backgroundColor}) => (backgroundColor ? theme.colors[backgroundColor] : theme.colors['--default-shade-white'])};
    
    border-radius: 8px;
    border: ${({theme}) => `1px solid ${theme.colors['--color-gray-400']}`};
`;

const HeaderContainer = styled.TouchableOpacity`
    width: 100%;
    height: 52px;
    flex-direction: row;
    background-color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    // padding-left: ${({theme}) => theme.space['--space-18']};
    padding-right: ${({theme}) => theme.space['--space-18']};
    border-bottom-color: ${({theme}) => theme.colors['--color-gray-300']};
    border-radius: ${({isCollapsed}) => (isCollapsed ? 0 : '8px')};
    border-bottom-width: ${({isCollapsed}) => (isCollapsed ? '1px' : 0)};
`;

const RoleContent = styled.View`
    display: flex;
    padding-left: ${({theme}) => theme.space['--space-18']};
    padding-right: ${({theme}) => theme.space['--space-18']};
    
`;

const ContentContainer = styled.View`
    display: flex;
    // margin-bottom: ${({theme}) => theme.space['--space-18']};
`;

function RoleTypeComponent({
    header = () => {
    },
    isCollapsed = true,
    content = () => {
    },
    hasCheckBox = true,
    isChecked = false,
    onCheckBoxPress = () => {
    },
    onItemPress,
    backgroundColor
}) {
    const theme = useTheme();

    return (
        <RoleWrapper theme={theme}>
            <RoleContainer
                theme={theme}
                backgroundColor={backgroundColor}
            >

                <HeaderContainer
                    theme={theme}
                    onPress={onItemPress}
                    activeOpacity={1}
                    isCollapsed={isCollapsed}
                >
                    {hasCheckBox && <CheckBoxComponent isCheck={isChecked} onPress={onCheckBoxPress}/>}
                    {header()}
                </HeaderContainer>

                {
                    isCollapsed && <RoleContent theme={theme}>
                        <ContentContainer theme={theme}>
                            {content}
                        </ContentContainer>
                    </RoleContent>
                }
            </RoleContainer>
        </RoleWrapper>
    );
}

export default RoleTypeComponent;
