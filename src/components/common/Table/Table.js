import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Header from './Header';
import Data from './Data';

import LineDivider from '../LineDivider';

import { CaseFileContext } from '../../../contexts/CaseFileContext';

const DividerContainer = styled.View`
    margin-bottom : ${({ theme }) => theme.space['--space-20']};
`;

const TableContainerContainer = styled.View`
    width : 100%;
    height : 38px;
    background-color : ${({ theme }) => theme.colors['--accent-button']};
    justify-content : center;
    align-items : center;
    margin-bottom : ${({ theme }) => theme.space['--space-8']};
    border-radius : 8px;
`;

const BannerText = styled.Text(({ theme }) => ({
    ...theme.font['--text-sm-medium'],
    color: theme.colors['--default-shade-white'],
}));
const ListWrapper = styled.View`
    display : flex;
    flex:1;
`;

const ListContainer = styled.View`
    display: flex;
`;

function Table({
    data = [],
    listItemFormat = () => {
    },
    headers = [],
    isCheckbox = true,
    toggleHeaderCheckbox = () => {},
    extraData=false,
    itemSelected = [],
    hasBanner = false,
    bannerText = '',
    
    keyExtractor = (item, i) => item.caseProcedureId ? i : Math.random()
 }) {
    // const {
    //     data = [],
    //     listItemFormat = () => {
    //     },
    //     headers = [],
    //     isCheckbox = true,
    //     toggleHeaderCheckbox = isCheckbox ? toggleHeaderCheckbox : () => {
    //     },
    //     itemSelected = isCheckbox ? itemSelected : [],
    //     hasBanner = false,
    //     bannerText = ""
    // } = props

    const theme = useTheme();
    // const toggleHeaderCheckbox = isCheckbox ? toggleHeaderCheckbox : ()=>{};
    // const itemSelected = isCheckbox ? itemSelected : [];

    const isIndeterminate = itemSelected?.length > 0 && itemSelected?.length !== data?.length;
    
    return (
        <ListWrapper>
            <ListContainer>
                <Header
                    headers={headers}
                    toggleHeaderCheckbox={toggleHeaderCheckbox}
                    isIndeterminate={isIndeterminate}
                    checked={itemSelected?.length > 0}
                    isCheckbox={isCheckbox}
                />

                <DividerContainer theme={theme}>
                    <LineDivider />
                </DividerContainer>

                <FlatList
                    listItemFormat={({item, index}) => listItemFormat(item, index)}
                    data={data}
                    style={{ height: '100%' }}
                    nestedScrollEnabled={true}
                    renderItem={({ item, index }) => listItemFormat(item, index)}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    keyboardShouldPersistTaps={'always'}
                    //extraData={extraData}
                /> 
                
            </ListContainer>
        </ListWrapper>
    );
};

export default Table;
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'red'
        //marginBottom:25,
    },
    data: {}
});
