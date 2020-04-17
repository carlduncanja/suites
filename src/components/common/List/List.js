import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import ListHeader from './ListHeader';
import ListData from './ListData';
import {SuitesContext} from '../../../contexts/SuitesContext';
import {useCheckBox} from '../../../helpers/caseFilesHelpers';

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
const List = ({
                  listData,
                  listHeaders,
                  itemsSelected,
                  listItemFormat,
                  onRefresh,
                  refreshing,
                  onSelectAll,
                  isCheckbox,
                  keyExtractor = (item) => (item.id || item._id) + new Date().getTime()
              }) => {

    const isIndeterminate = itemsSelected.length > 0 && itemsSelected.length !== listData.length;

    return (
        <View>
            <View style={styles.header}>
                <ListHeader
                    listHeaders={listHeaders}
                    toggleHeaderCheckbox={onSelectAll}
                    checked={itemsSelected.length > 0}
                    isCheckbox={isCheckbox}
                    isIndeterminate={isIndeterminate}
                />
            </View>
            <View style={styles.data}>
                <FlatList
                    data={listData}
                    renderItem={({item}) => listItemFormat(item)}
                    keyExtractor={keyExtractor}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    contentContainerStyle={{paddingBottom: 150}}
                />
            </View>
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    header: {
        marginBottom: 25,
    },
    data: {}
});
