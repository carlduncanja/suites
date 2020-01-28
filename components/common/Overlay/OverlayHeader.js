import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ExitIcon from '../ExitIcon';

export default class OverlayHeader extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.overlayTitle}</Text>
                <ExitIcon/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
    }
})