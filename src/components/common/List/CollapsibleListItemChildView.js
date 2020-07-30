import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import LineDivider from '../LineDivider';
import Collapsible from 'react-native-collapsible';
import styled, { css } from '@emotion/native';
import CheckBoxComponent from "../Checkbox";
import { useTheme } from 'emotion-theming';

function CollapsibleListItemChildView ({isCollapsed=false, children =()=>{}}){
    
    const theme = useTheme() 

    const ChildContentWrapper = styled.View`
        margin : 0;
    `;
    const ChildContentContainer = styled.View`
        display: flex;
        flexDirection: 'column';
    `;

    return (
        <Collapsible collapsed={isCollapsed}>
            <LineDivider/>

            {
                !isCollapsed &&
                <ChildContentWrapper>
                    <ChildContentContainer>
                        {children}
                    </ChildContentContainer>
                </ChildContentWrapper>
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
