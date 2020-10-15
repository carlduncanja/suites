import React, {useState} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const RoleWrapper = styled.View`
    display: flex;
`;

const RoleContainer = styled.View`
    display : flex;
    flex-direction: column;
    background-color: ${({theme, backgroundColor}) => (backgroundColor ? theme.colors[backgroundColor] : theme.colors['--default-shade-white'])};
`;

const HeaderContainer = styled.TouchableOpacity`
    width: 100%;
    height: 52px;
    flex-direction: row;
    background-color: white;  
`;

const RoleContent = styled.View`
    display: flex;
`;

const ContentContainer = styled.View`
    display: flex;
    // margin-bottom: ${({theme}) => theme.space['--space-18']};
`;

const Divider = styled.View`
  height: 1px;
  background: ${({theme}) => theme.colors['--color-gray-300']};
`;

function RoleTypeGroupComponent({
    header = () => {
    },
    isCollapsed = true,
    content = () => {
    },
    onItemPress,
    backgroundColor,
    showDivider = true
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
            {showDivider && <Divider theme={theme}/>}
        </RoleWrapper>
    );
}

export default RoleTypeGroupComponent;
