import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Table from '../common/Table/Table';
import Item from '../common/Table/Item';
import {currencyFormatter, formatDate} from '../../utils/formatter';
import DataItem from '../common/List/DataItem';
import { useTheme } from 'emotion-theming';
import styled, {css} from '@emotion/native';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import Footer from '../common/Page/Footer';


const testData = [
    {
        name: 'Coronary Bypass Graft',
        isRecovery: true,
        duration: 1,
        date: new Date()
    },
    {
        name: 'Biotherapy (Biological Therapy)',
        isRecovery: false,
        duration: 5,
        date: new Date()
    }
];


const headers = [
    {
        name: 'Procedure',
        alignment: 'flex-start',
        flex:2,
    },
    {
        name: 'Recovery',
        alignment: 'center',
        flex:1,
    },
    {
        name: 'Duration',
        alignment: 'center',
        flex:1,
    },
    {
        name: 'Date',
        alignment: 'flex-end',
        flex:1
    }, 
];

const ItemWrapper = styled.View`
    flex-direction : row;
    height : 28px;
    border-bottom-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    border-bottom-width : 1px;
    border-bottom-style : solid;
    margin-bottom: ${ ({theme}) => theme.space['--space-12']};
`

const HistoryTabs = ({ cases = testData, selectedItems = [], onCheckboxPress = () => {}, onSelectAll = () => {} }) => {

    const theme = useTheme();

    const listItem = ({name, isRecovery, duration, date}) => {
        let recoveryColor = isRecovery ? '--color-green-600' : '--color-orange-500'
        return (
            <ItemWrapper theme={theme}>
                <DataItem flex={2} color="--color-blue-600" text={name} fontStyle="--text-base-medium"/>
                <DataItem align="center" color={recoveryColor} text={isRecovery ? 'Yes' : 'No'} fontStyle="--text-base-medium"/>
                <DataItem align="center" color="--color-gray-800" text={`${duration} hrs`} fontStyle="--text-base-regular"/>
                <DataItem align="flex-end" color="--color-gray-800" text={formatDate(date, 'MM/DD/YYYY')} fontStyle="--text-base-regular"/>
                {/* <View style={[styles.item, {alignItems: 'flex-start', flex:2, backgroundColor:'red'}]}>
                    <Text style={[styles.itemText, {color: "#3182CE"}]}>{name}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center',flex:1}]}>
                    <Text style={[styles.itemText,{color:recoveryColor}]}>{}</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center',flex:1}]}>
                    <Text style={styles.itemText}>{duration} hrs</Text>
                </View>
                <View style={[styles.item, {alignItems: 'center',flex:1}]}>
                    <Text style={styles.itemText}>{}</Text>
                </View> */}
            </ItemWrapper>
        )
    }
    

    const renderListFn = (item) => {
        return <Item
            hasCheckBox={false}
            onItemPress={() => {}}
            itemView={listItem(item)}
        />
    };

    return (
        <>
            <ScrollView>
                <Table
                    isCheckbox={false}
                    data={cases}
                    listItemFormat={listItem}
                    headers={headers}
                    toggleHeaderCheckbox={onSelectAll}
                    itemSelected={selectedItems}
                />
            </ScrollView>

            <Footer
                hasPaginator={false}
                hasActions={false}
            />
        </>
    );
};

export default HistoryTabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginBottom: 10
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: '#4A5568',
    },
    headersContainer: {
        //flex:1,
        marginLeft: 10,
        flexDirection: 'row',
        //width:'100%'
    },
    headerItem: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 12,
        color: '#718096'
    }
});
