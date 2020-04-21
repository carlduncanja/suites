import React,{ useState } from "react";
import { View, FlatList } from 'react-native';

const ColumnSection = ({data, numOfColumns}) => {
    const width = `${100/numOfColumns}%`
    return (
        <FlatList
            data = {data}
            renderItem = { ({ item }) => <View style={{width:width, marginBottom:20, paddingRight:10}}>{item}</View>}
            keyExtractor = {(item, index) => ""+index}
            numColumns = {numOfColumns}
            horizontal={false}
        />
    )
}

export default ColumnSection