import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import ListHeader from './ListHeader';
import ListData from './ListData';
import {SuitesContext} from '../../../contexts/SuitesContext';
import {useCheckBox} from '../../../helpers/caseFilesHelpers';

/**
 * @param listData array of objects
 * @param listHeaders array of objects
 * @param currentPageListMax number
 * @param currentPageListMin number
 * @param listItemFormat object
 * @param onRefresh
 * @param refreshing
 * @param keyExtractor
 * @return {*}
 */
const List = ({
                  listData,
                  listHeaders,
                  currentPageListMin,
                  currentPageListMax,
                  listItemFormat,
                  onRefresh,
                  refreshing,
                  keyExtractor = (item) => item.id + new Date().getTime()
              }) => {
    const [state] = useContext(SuitesContext);

    const [checkBoxList, setCheckBoxList] = useState([]);

    const toggleCheckBox = (item) => {
        let checkedItemsList = useCheckBox(item, checkBoxList);
        setCheckBoxList(checkedItemsList)
    };

    const toggleHeaderCheckbox = () => {
        checkBoxList.length > 0
            ? setCheckBoxList([])
            : setCheckBoxList(listData)
    };

    return (
        <View>
            <View style={styles.header}>
                <ListHeader
                    listHeaders={listHeaders}
                    checkedItemList={checkBoxList}
                    toggleHeaderCheckbox={toggleHeaderCheckbox}
                    dataLength={listData.length}
                />
            </View>
            <View style={styles.data}>
                <FlatList
                    data={listData}
                    renderItem={({item}) => listItemFormat(item)}
                    keyExtractor={keyExtractor}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    contentContainerStyle={{paddingBottom:150}}
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
    data: {
    }
});
