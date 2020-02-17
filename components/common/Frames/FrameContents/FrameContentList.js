import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FrameItem from '../FrameItems/FrameItem'

export default class FrameContentList extends Component{
    render(){
        const information = this.props.cardInformation
        return(
            <View style={styles.container}>
                {
                    information.length === 0 ?
                    <View style={styles.itemContainer}>
                        <FrameItem itemContent = "None"/>
                    </View>
                    :
                    information.map((itemContent,index)=>{
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