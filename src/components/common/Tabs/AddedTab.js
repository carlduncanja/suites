import React, {Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AddTab from "../../../../assets/svg/addTab";

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const AddedTabWrapper = styled.TouchableOpacity`
    margin-left : ${ ({theme}) => theme.space['--space-16']};
`;
const AddedTabContainer = styled.View`
    height: 100%;
    justify-content : center;
    flex-direction : row;
    align-items: center;
`;

const TabText = styled.Text( ({theme}) => ({
    ...theme.font['--text-xs-medium'],
    color : theme.colors['--color-gray-500'],
    marginLeft : 6,
}))


function AddedTab({onAddTab, tabName, tabsLength = 0}) {

    const theme = useTheme();
 
    return (
        
        <AddedTabWrapper theme = {theme} onPress = { onAddTab}>
            <AddedTabContainer>

                <AddTab/>
                <TabText>
                    { `${tabName} ${tabsLength+1}` }
                </TabText>
           
            </AddedTabContainer>
        </AddedTabWrapper>

    );
};

export default AddedTab;

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
