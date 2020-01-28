import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from '../Checkbox';
import moment from 'moment';

export default class ListItem extends Component{
    render(){
        return(
            <TouchableOpacity >
                <View style={styles.container}>
                    <View style={{alignSelf:'center', justifyContent:'center'}}>
                        <Checkbox/>
                    </View>
                    
                    <View style={{flex:1,flexDirection:"row", marginLeft:10}}>
                        <View style={[styles.item]}>
                            {this.props.name}
                        </View>

                        <View style={[styles.item,]}>
                            <Text style={styles.itemText}>{this.props.caseDetails.balance}</Text>
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.itemText}>{this.props.caseDetails.staff}</Text>
                        </View>                       
                       
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{moment(this.props.caseDetails.nextVisit).format("MMM D, YYYY")}</Text>
                        </View> 
                    </View>
                </View>
            </TouchableOpacity>
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
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        borderWidth:1,
        borderColor: "#E3E8EF",
        width:'100%'
    },
    item:{
        width:'25%',
        alignItems:"flex-start",
        justifyContent:'center'
    },
    itemText:{
        fontSize:14,
        color:"#4E5664",
    }
})