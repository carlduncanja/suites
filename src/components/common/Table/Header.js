import React, {Component, useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import {CheckedBox, PartialCheckbox} from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import CheckBoxComponent from '../Checkbox';

import HeaderItem from './HeaderItem';

const HeaderWrapper = styled.View`
    width:100%;
`;
const HeaderContainer = styled.View`
    align-items: flex-start;
    flex-direction:row;
    align-items:center;
    padding-left:1px;
    padding-bottom : ${ ({theme, hasCheckbox}) => hasCheckbox === false ? theme.space['--space-14'] : 0};
`;

function Header({headers = [], toggleHeaderCheckbox = () => {}, isIndeterminate = false, checked = false, isCheckbox = true}) {
    const [selectedHeader, setSelectedHeader] = useState('');
    const theme = useTheme();

    const onSelectHeader = name => {
        console.log('Header: ', name);
        setSelectedHeader(name);
    };

    return (
        <HeaderWrapper theme={theme}>
            <HeaderContainer hasCheckbox={isCheckbox}>
                {
                    isCheckbox &&
                        <CheckBoxComponent
                            isIndeterminate={isIndeterminate}
                            onPress={toggleHeaderCheckbox}
                            isCheck={checked}
                        />
                }

                {headers.map((header, index) => (
                    <HeaderItem
                        header={header}
                        index={index}
                        key={index}
                        selectedHeader={selectedHeader}
                        onSelectHeader={onSelectHeader}
                    />
                ))}
            </HeaderContainer>
        </HeaderWrapper>
    );
}

export default Header;

const styles = StyleSheet.create({
    headersContainer: {
        //flex:1,
        // marginLeft: 10,
        flexDirection: 'row',
        //width:'100%'
    },
    item: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 16,
        color: '#718096'
    }
});
