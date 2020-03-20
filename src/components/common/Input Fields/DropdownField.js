import React,{Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon';


export default class DropdownField extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldText}>{this.props.field}</Text>
                    <View style={styles.selectedContainer}>
                        <Text style={styles.selectedText}>{this.props.selected}</Text>
                        <TouchableOpacity>
                            <SvgIcon iconName="dropdown"/>
                        </TouchableOpacity>
                    </View>
                </View>


               {/* <View style={styles.optionsContainer}>
                    {this.props.fieldOptions.map((option, index)=>{
                        return(
                            <View style={styles.option}>
                                <Text>{option}</Text>
                            </View>
                        )
                    })}
               </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    },
    fieldContainer:{
        flexDirection:'row',
    },
    fieldText:{
        fontSize:12,
        color:"#718096"
    },
    selectedContainer:{
        width:"50%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-between',
        padding:5,
        position:'absolute',
        left:'40%',
        backgroundColor:'#FFFFFF',
        borderRadius:4,
        borderWidth:1,
        borderColor:'#E3E8EF',
    },
    selectedText:{
        paddingRight:15
    },
    optionsContainer:{
        flexDirection:'column'
    }
})
