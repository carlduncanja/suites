import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import TabsContainer from "../Tabs/TabsContainerComponent";
import AddTab from "../../../../assets/svg/addTab";

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const DialogTabsWrapper = styled.View`
    height : 36px;
    width : 100%;
    background-color: blue;
`;
const DialogTabsContainer = styled.View`
    width : 100%;
    height: 100%;
    flex-direction : row;
    align-items: flex-end;
    justify-content: flex-start;
    background-color: ${ ({theme}) => theme.colors['--color-gray-200']};
    background-color: yellow;
`;


function DialogTabs({tabs, tab, onTabPress, onAddTab, tabName, tabPlacement="center"}) {

    const theme = useTheme();
    return (
        <DialogTabsWrapper>
            <DialogTabsContainer theme = {theme}>
                <TabsContainer
                    tabs={tabs}
                    onPressChange={onTabPress}
                    selectedTab={tabs[tab]}
                    paddingTop = {12}
                    justify = {tabPlacement}
                    onAddTab = {onAddTab}
                    tabName = {tabName}
                />
            </DialogTabsContainer>
        </DialogTabsWrapper>
    );
}

DialogTabs.propTypes = {};
DialogTabs.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF2F6',
        // paddingTop:8,
    }
});

export default DialogTabs;
