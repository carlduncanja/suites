import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../assets/SvgIcon';
import Svg from 'react-native-svg';

export default class Paginator extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    <SvgIcon iconName = "paginationPrev" strokeColor="#104587"/>
                </TouchableOpacity>
                
                <View style={styles.numbersContainer}>
                    <Text style={styles.numbers}>{this.props.currentPage} of {this.props.totalPages}</Text>
                </View>
                <TouchableOpacity>
                    <SvgIcon iconName = "paginationNext" strokeColor="#104587"/>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    numbersContainer:{
        backgroundColor:'#FAFAFA',
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderRadius:4,
        paddingLeft:7,
        paddingRight:7,
        paddingBottom:2, 
        paddingTop:2,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row'
    },
    numbers:{
        fontSize:14,
        color:'#313539'
    }
})