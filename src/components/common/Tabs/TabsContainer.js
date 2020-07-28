import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Tab from './Tab';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
 
function TabsContainer({tabs, onPressChange, selectedTab, completedTabs}){

    const theme = useTheme();
    const TabsWrapper = styled.View`
        width:100%;
        flex:1;
    `
    const TabsContainer = styled.View`
        height: 100%;
        align-items: flex-start;
        flex-direction: row;
    `
    return (
        <TabsWrapper>
            <TabsContainer>
                {tabs.map((tab, index)=>{
                    console.log("Tab: ", tab)
                    console.log(" Selected Tab: ", selectedTab)
                    return (
                        <Tab
                            tabName = {tab}
                            backgroundColor = {tab === selectedTab ? theme.colors['--default-shade-white'] : null}
                            textColor = { 
                                tab === selectedTab ? theme.colors['--color-blue-600'] : 
                                    completedTabs && completedTabs.includes(tab) ? "#4E5664" : "#718096"
                            }
                            onTabPress = {()=>onPressChange(tab)}
                        />
                    )
                })}
            </TabsContainer>
        </TabsWrapper>
        // <View style={styles.container}>
        //     {tabs.map((tab, index)=>{
        //         return (
        //             <View key={index}>
        //             <TouchableOpacity onPress = {()=>{onPressChange(tab)}} activeOpacity={1}>
        //                 <Tab
        //                     tabName={tab}
        //                     backgroundColor={tab === selectedTab ? "#FFFFFF" : null}
        //                     textColor={
        //                         tab === selectedTab ? "#3182CE" :
        //                             completedTabs && completedTabs.includes(tab) ? "#4E5664" :
        //                                 "#718096"
        //                     }
        //                 />
        //             </TouchableOpacity>

        //             </View>
        //         )
        //     })}
        // </View>
    );
};

export default TabsContainer;

const styles = StyleSheet.create({
    container:{
        alignSelf:'flex-start',
        flexDirection:'row',
    },
    base:{
        height:10,
        width:'100%',
        backgroundColor:"#FFFFFF"
    }
});
