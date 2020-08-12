import React, {Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Tab from './Tab';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const TabsWrapper = styled.View`
        width:100%;
        height: 54px;
    `
const TabsContainer = styled.View`
        height: 100%;
        align-items: flex-end;
        flex-direction: row;
        padding-top: 25px;
        background-color: ${({theme}) => theme.colors['--color-gray-200']};
    `


function TabsContainerComponent({tabs, onPressChange, selectedTab, completedTabs}) {

    const theme = useTheme();

    return (
        <TabsWrapper>
            <TabsContainer theme={theme}>
                {tabs.map((tab, index) => {
                    return (
                        <Tab
                            key={index}
                            tabName={tab}
                            backgroundColor={tab === selectedTab ? theme.colors['--default-shade-white'] : null}
                            textColor={
                                tab === selectedTab ? theme.colors['--color-blue-600'] :
                                    completedTabs && completedTabs.includes(tab) ? "#4E5664" : "#718096"
                            }
                            onTabPress={() => onPressChange(tab)}
                        />
                    )
                })}
            </TabsContainer>
        </TabsWrapper>
    );
};

export default TabsContainerComponent;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    base: {
        height: 10,
        width: '100%',
        backgroundColor: "#FFFFFF"
    }
});
