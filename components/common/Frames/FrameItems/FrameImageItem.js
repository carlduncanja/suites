import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
                    {/* <Image source={require('../../../../assets/testImage1.jpg')}/> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:"#FFFFFF",
        borderRadius:4,
        alignItems:'flex-start',
        justifyContent:'center',
        padding:5
    },
    titleContainer:{
        backgroundColor:"#FFFFFF",
        padding:4
    },
    title:{
        fontSize:14, 
        color:'#3182CE'
    },
    image:{
        alignItems:'center',
        backgroundColor:'#E3E8EF',
        borderColor:'#CCD6E0',
        borderWidth:1,
    }
})