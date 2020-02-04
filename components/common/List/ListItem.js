import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default class ListItem extends Component{
    render(){
        // console.log("Checked: ", this.props.checked, "Selected: ", this.props.selectedCaseFile)
        return(
            <TouchableOpacity onPress={()=>this.props.setSelected(this.props.fields.recordId)}>
                <View style={styles.container}>
                    <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}} onPress={()=>this.props.toggleCheckbox(this.props.fields.recordId)}>
                        {/* <Checkbox/> */}
                        {this.props.checkbox}
                    </TouchableOpacity>
                    
                    <View style={{flex:1,flexDirection:"row", marginLeft:10}}>
                        {this.props.fields.recordInformation.map((field,index)=>{
                            return(
                                <View style={styles.item} key={index}>
                                    {field}
                                </View>
                            )
                            
                        })}
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
        width:'100%',
        marginBottom:10
    },
    item:{
        width:'25%',
        alignItems:"flex-start",
        justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        color:"#4E5664",
    }
})