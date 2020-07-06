import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class FrameImageItem extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.props.image.name}
                    </Text>
                </View>
                <View style={styles.image}>
                    <Image source={require('../../../../../assets/icon.png')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#F8FAFB',
        alignItems:'flex-start',
        justifyContent:'center',
        margin:15
    },
    titleContainer:{
        backgroundColor:"#FFFFFF",
        flex:1,
        width:"100%",
        borderBottomColor:"#CCD6E0",
        borderBottomWidth:1,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        padding:7
    },
    title:{
        fontSize:14,
        color:'#3182CE'
    },
    image:{
        flex:1,
        width:'100%',
        alignItems:'center',
        backgroundColor:'#E3E8EF',
        borderColor:'#CCD6E0',
        justifyContent:"center",
        alignSelf:'center',
        paddingLeft:20,
        paddingRight:20
        //borderWidth:1,
    }
})
