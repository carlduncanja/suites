import React, {useContext, useEffect} from 'react';
import {View, StyleSheet,FlatList} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Header from './Header';
import Data from './Data';

import LineDivider from '../LineDivider';

import {CaseFileContext} from '../../../contexts/CaseFileContext';
//import { FlatList } from 'react-native-gesture-handler';

const DividerContainer = styled.View`
    margin-bottom : ${({theme}) => theme.space['--space-20']};
`;

const TableContainerContainer = styled.View`
    width : 100%;
    height : 38px;
    background-color : ${({theme}) => theme.colors['--accent-button']};
    justify-content : center;
    align-items : center;
    margin-bottom : ${({theme}) => theme.space['--space-8']};
    border-radius : 8px;
`;

const BannerText = styled.Text(({theme}) => ({
    ...theme.font['--text-sm-medium'],
    color: theme.colors['--default-shade-white'],
}));

const Table = ({
    data = [],
    listItemFormat = () => {
    },
    headers = [],
    isCheckbox = true,
    toggleHeaderCheckbox = () => {
    },
    itemSelected = [],
    hasBanner = false,
    bannerText = '',
    keyExtractor = (item) => ((item?.id || "") || (item?._id || "")) + new Date().getTime(),
    ...props
}) => {
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
        <>
            <Header
                headers={headers}
                toggleHeaderCheckbox={toggleHeaderCheckbox}
                isIndeterminate={isIndeterminate}
                checked={itemSelected?.length > 0}
                isCheckbox={isCheckbox}
            />

            <DividerContainer theme={theme}>
                <LineDivider/>
            </DividerContainer>

            {
                hasBanner &&
                <TableContainerContainer theme={theme}>
                    <BannerText theme={theme}>{bannerText}</BannerText>
                </TableContainerContainer>
            }

            <FlatList
                 style={{height: '100%'}}
                 nestedScrollEnabled={true}
                 data={data}
                 renderItem={({item}) => listItemFormat(item)}
                 keyExtractor={keyExtractor}
                 contentContainerStyle={{paddingBottom: 100}}
                 keyboardShouldPersistTaps={'always'}
            />
        </>
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
