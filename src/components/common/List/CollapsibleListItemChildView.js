import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import LineDivider from '../LineDivider';
import Collapsible from 'react-native-collapsible';
import styled, { css } from '@emotion/native';
import CheckBoxComponent from "../Checkbox";
import { useTheme } from 'emotion-theming';

const ChildContentWrapper = styled.View`
    margin : 0;
`;
const ChildContentContainer = styled.ScrollView`
    max-height : ${ ({children}) => children.props.data.length > 0 ? `400px` : '20px'};
    border-bottom-width : 1px;
    border-bottom-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    border-bottom-right-radius : 8px;
    border-bottom-left-radius : 8px;
`;

function CollapsibleListItemChildView ({isCollapsed=false, children =()=>{}, onAnimationEnd}){
    const theme = useTheme();

    return (

        <Collapsible onAnimationEnd={onAnimationEnd} collapsed={isCollapsed}>
            <LineDivider/>
            {
                !isCollapsed &&
                <ChildContentContainer children = {children}>
                    {children}
                </ChildContentContainer>
            }

        </Collapsible>
    )
}


export default CollapsibleListItemChildView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: "#E3E8EF",
    },
    divider: {
        // flex: 1,
        width: '100%',
        height: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#E3E8EF",
        marginBottom: 20
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    childContent: {
        flex: 1,
        flexDirection: 'column',

        // padding: 8,
        // marginTop: 0
    }
});
