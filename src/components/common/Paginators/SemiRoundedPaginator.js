import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Paginator from './Paginator';

export default class SemiRoundedPaginator extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Paginator {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderTopRightRadius:32,
        borderBottomRightRadius:32,
        backgroundColor:"#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,    
        elevation: 5,
    },
})