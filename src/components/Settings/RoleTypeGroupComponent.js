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

// style permission header
const HeaderContainer = styled.TouchableOpacity`
    width: 100%;
    height: 52px;
    flex-direction: row;
    background-color: pink;  
`;

const RoleContent = styled.View`
    display: flex;
`;

// manipulate the style for content under permission header
const ContentContainer = styled.View`
    background-color: orange;
    display: flex;
    // margin-bottom: ${({theme}) => theme.space['--space-18']};
`;

// space between each permission
const Divider = styled.View`
  height: 1px;
  background: ${({theme}) => theme.colors['--color-gray-300']};
  background-color: red;
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
                {/*this is the header for each permission
                    eg: 
                        case file, theatres, inventory
                    you get the picture
                */}
                <HeaderContainer
                    theme={theme}
                    // toggles the permissions header
                    // collapsed or expanded
                    onPress={onItemPress}
                    activeOpacity={1}
                    isCollapsed={isCollapsed}
                >
                    {header()}
                </HeaderContainer>
                
                {
                    // this is the permissions
                    // this is the toggle things that we get 
                    // remove this and they don't show up anymore
                    // eg: 
                        // new case file
                        // view case files
                        // edit case files
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
