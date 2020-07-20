import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import Header from '../Table/Header';
import ListHeader from './ListHeader';
import ListData from './ListData';
import {SuitesContext} from '../../../contexts/SuitesContext';
import {useCheckBox} from '../../../helpers/caseFilesHelpers';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
 
/**
 * @param listData array of objects
 * @param listHeaders array of objects
 * @param listItemFormat object
 * @param onRefresh
 * @param itemsSelected
 * @param refreshing
 * @param onSelectAll
 * @param isCheckbox
 * @param keyExtractor
 * @returns {*}
 */

function List({
        listData = [],
        listHeaders = [],
        itemsSelected = [],
        listItemFormat = () => {},
        onRefresh = () => {},
        refreshing = false,
        onSelectAll = () =>{},
        isCheckbox = false,
        keyExtractor = (item) => ((item?.id || "") || (item?._id || "")) + new Date().getTime()
    }){

    const theme = useTheme()
    
    const isIndeterminate = itemsSelected.length > 0 && itemsSelected.length !== listData.length;
    
    // should list fill remaining space or as much as content ? 
    const ListWrapper = styled.View`
        display : flex;
        flex:1;
        background-color: ${theme.colors['--color-purple-400']};
    ` 
    const ListContainer = styled.View`
        display: flex;
    `
    return (
        <ListWrapper> 
            <ListContainer>
                <Header
                    headers={listHeaders}
                    toggleHeaderCheckbox={onSelectAll}
                    checked={itemsSelected.length > 0}
                    isCheckbox={isCheckbox}
                    isIndeterminate={isIndeterminate}
                />
           
                <FlatList
                    data={listData}
                    renderItem={({item}) => listItemFormat(item)}
                    keyExtractor={keyExtractor}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    // contentContainerStyle={{paddingBottom: 150}}
                />
            </ListContainer>
        </ListWrapper>
    );
};

export default List;

const styles = StyleSheet.create({
    header: {
        marginBottom: 25,
    },
    data: {}
});
