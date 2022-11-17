import React, {Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CreationTab from './CreationTab';
import AddTab from "../../../../assets/svg/addTab";
import AddedTab from './AddedTab';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const TabsWrapper = styled.View`
    width:100%;
    height: 100%;
` ;

const TabsContainer = styled.View`
    height : 100%;
    width : 100%;
    align-items : center;
    background-color: ${({theme, backgroundColor}) => theme.colors[backgroundColor]};
`;
// const TabsContainer = styled.View`
//     height: 80%;
//     align-items: center;
//     flex-direction: row; 
//     background-color: ${({theme, backgroundColor}) => theme.colors[backgroundColor]};
//     justify-content : center;
//     justify-content: ${({justify}) => justify};
// `;

function CreationTabsContainerComponent({tabs, onPressChange, backgroundColor='--color-gray-200', selectedTab, completedTabs, paddingTop = 25, justify = 'flex-start'}) {

    const theme = useTheme();
 
    return (
        <TabsWrapper>
            <TabsContainer theme={theme} paddingTop = {paddingTop} justify = {justify} backgroundColor = {backgroundColor}>
                {/* <Text>Hello</Text> */}
                {tabs.map((tab, index) => {
                    return ( 
                        <CreationTab
                            key={index}
                            tabName={tab}
                            backgroundColor={tab === selectedTab ? theme.colors['--default-shade-white'] : null}
                            textColor={
                                tab === selectedTab ? theme.colors['--color-blue-600'] :
                                    completedTabs && completedTabs.includes(tab) ? "#4E5664" : "#718096"
                            }
                            onTabPress={() => onPressChange && onPressChange(tab)}
                        />
                    )
                })} 
            </TabsContainer>
        </TabsWrapper>
    );
};

export default CreationTabsContainerComponent;

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
