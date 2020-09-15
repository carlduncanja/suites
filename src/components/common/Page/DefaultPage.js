import React from 'react';
import {View} from 'react-native';
import styled from '@emotion/native'
import {useTheme} from "emotion-theming";
import PropTypes from 'prop-types';

const PageWrapper = styled.View`
  flex: 1;
  display: flex;  
  margin:0;
  background-color: ${({ theme }) => theme.colors['--default-shade-white']};
`
const PageContentWrapper = styled.View`
  display: flex;
  flex: 1;
  //padding: ${({ theme }) => theme.space['--space-32']};
`

const HeaderWrapper = styled.View`
  display: flex;
  height: 47px;
  //width: 80%;
  justify-content: center;
  padding-left: ${({ theme }) => theme.space['--space-24']};
  padding-right: ${({ theme }) => theme.space['--space-24']};
  
`
const HeaderContainer = styled.View`
  //flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled.Text`
    font:${({ theme }) => theme.font["--text-xl-medium"]};
    color:${({ theme }) => theme.colors["--company"]};
`;

const CloseButtonWrapper = styled.View`
    //align-items:flex-end;
    //width:540px;
`;
const CloseButtonContainer = styled.TouchableOpacity`
    background-color:${({ theme }) => theme.colors["--color-gray-300"]};
    width:68px;
    height:26px;
    padding:4px 14px;
    border-radius:6px;
    justify-content:center;
`;
const CloseText = styled.Text`
    color:${({ theme }) => theme.colors["--color-gray-600"]};
    font:${({ theme }) => theme.font["--text-sm-bold"]};
`;



function DefaultPage({pageTitle, onClosePress, ...props}) {
    const theme = useTheme();
    return (
        <PageWrapper theme={theme}>
            <HeaderWrapper theme={theme}>
                <HeaderContainer theme={theme}>
                    <HeaderText theme={theme}>{pageTitle}</HeaderText>
                    <CloseButtonWrapper>
                        <CloseButtonContainer onPress={onClosePress}>
                            <CloseText>Close</CloseText>
                        </CloseButtonContainer>
                    </CloseButtonWrapper>
                </HeaderContainer>
            </HeaderWrapper>


            <PageContentWrapper>
                {props.children}
            </PageContentWrapper>
        </PageWrapper>
    );
}

DefaultPage.propTypes = {};
DefaultPage.defaultProps = {};

export default DefaultPage;
