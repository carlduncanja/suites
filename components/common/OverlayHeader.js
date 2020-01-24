import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default class OverlayHeader extends Component{
    render(){
        return(
            <View style={styles.continer}>
                <Text>{this.props.overlayTitle}</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})