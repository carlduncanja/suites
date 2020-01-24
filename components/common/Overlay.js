import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default class Overlay extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>

                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.progressContainter}>

                    </View>
                    <View style={styles.dataContainer}>

                    </View>

                </View>
                <View style={styles.footerContainer}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{},
    headerContainer:{
        borderBottomColor:'#CCD6E0',
        borderBottomWidth:1
    },
    contentContainer:{},
    progressContainter:{
        backgroundColor:'#EEF2F6'
    },
    dataContainer:{},
    footerContainer:{
        position:'absolute',
        bottom:0,
        padding:20,
        borderTopColor:"#CCD6E0",
        borderTopWidth:1,
        backgroundColor:'#FFFFFF'
    }
})