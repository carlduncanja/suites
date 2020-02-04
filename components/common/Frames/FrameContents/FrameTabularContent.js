import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FrameItem from '../FrameItems/FrameItem'

export default class FrameContentList extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.contentTitle}</Text>
                <FlatList
                    data={this.props.cardInformation}
                    renderItem={({item})=> <View style={styles.itemContainer}>{item}</View>}
                    keyExtractor = {item => item.fieldId}
                    numColumns={2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:16,
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderTopWidth:0
    },
    contentTitle:{
        fontSize:16,
        color:'#4E5664',
    },
    itemContainer:{
        paddingBottom:12,
        alignItems:'flex-end',
    }
    
})