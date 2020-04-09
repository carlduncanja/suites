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
                  keyExtractor = (item) => item.id + new Date().getTime()
              }) => {
    const [state] = useContext(SuitesContext);

    // const [checkBoxList, setCheckBoxList] = useState([]);

    // const toggleCheckBox = (item) => {
    //     let checkedItemsList = useCheckBox(item, checkBoxList);
    //     setCheckBoxList(checkedItemsList)
    // };

    // const toggleHeaderCheckbox = () => {
    //     checkBoxList.length > 0
    //         ? setCheckBoxList([])
    //         : setCheckBoxList(listData)
    // };

    const isIndeterminate = itemsSelected.length > 0 

    return (
        <View>
            <View style={styles.header}>
                <ListHeader
                    listHeaders={listHeaders}
                    toggleHeaderCheckbox={onSelectAll}
                    // checked={}
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
