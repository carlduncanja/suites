import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Checkbox from '../Checkbox';

export default class ListHeader extends Component{
    render(){
        const width = 100/this.props.listHeaders.length
        return(
            <View style = {styles.container}>
                <View style={{justifyContent:'center', alignSelf:'center'}}>
                    <Checkbox/>
                </View>
                <View style={styles.headersContainer}>
                    {this.props.listHeaders.map((header,index)=>{
                        return(
                            <View style={[styles.item,{width:`${width}%`}]} key={index}>
                                <Text style={styles.headerText}>{header}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:10,
        width:'100%'
    },
    headersContainer:{
        flex:1,
        marginLeft:10,
        flexDirection:'row',
    },
    item:{
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerText:{
        fontSize:12,
        color:'#718096'
    }
})