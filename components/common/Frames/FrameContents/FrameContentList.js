import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FrameItem from '../FrameItems/FrameItem'

export default class FrameContentList extends Component{
    render(){
        return(
            <View style={styles.container}>
                {this.props.cardInformation.map((itemContent,index)=>{
                    return(
                        <View key={index} style={styles.itemContainer}>
                            <FrameItem itemContent = {itemContent}/>
                        </View>
                    )
                })}
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
    itemContainer:{
        paddingBottom:12
    }
    
})