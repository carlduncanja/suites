import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import TabsContainer from "../Tabs/TabsContainerComponent";
import AddTab from "../../../../assets/svg/addTab";

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import CreationTabsContainerComponent from '../Tabs/CreationTabsContainerComponent';

const DialogTabsWrapper = styled.View`
    height : 44px;
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


function CreationDialogTabs({tabs, tab, onTabPress, onAddTab, tabName}) {

    const theme = useTheme();
    return (
        <DialogTabsWrapper> 
            <DialogTabsContainer theme = {theme}> 

                <CreationTabsContainerComponent
                    tabs={tabs}
                    onPressChange={onTabPress}
                    selectedTab={tabs[tab]}
                    paddingTop = {12}
                    justify = "center"
                    onAddTab = {onAddTab}
                    tabName = {tabName}
                />

                {/* <View style={{
                    flexDirection: "row",
                    alignSelf: 'flex-end',
                    justifyContent: "flex-end"
                }}>
                    <TabsContainer
                        tabs={tabs}
                        onPressChange={onTabPress}
                        selectedTab={tabs[tab]}
                    />
                    {
                        onAddTab &&
                        <View style={{justifyContent: "center", marginLeft: 16}}>
                            <TouchableOpacity
                                style = {{flex:1, justifyContent: "center", flexDirection: "row", alignItems: 'center'}}
                                onPress={onAddTab}
                            >
                                <AddTab/>
                                <Text style={{marginLeft: 6, color: "#A0AEC0", fontWeight: "500"}}>
                                    { `${tabName} ${tabs.length+1}` }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View> */}
            </DialogTabsContainer>
        </DialogTabsWrapper>
    );
}

CreationDialogTabs.propTypes = {};
CreationDialogTabs.defaultProps = {};

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

export default CreationDialogTabs;
