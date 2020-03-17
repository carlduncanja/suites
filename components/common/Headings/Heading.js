import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OverlayButton from '../OverlayButtons/OverlayButton';

export default class Heading extends Component{
    render(){
        return(
            <View style={[styles.container,{backgroundColor:this.props.backgroundColor}]}>
                <Text style={{fontSize:16, marginBottom:5, color:this.props.headerIdColor}}>
                    {this.props.headerId}
                </Text>
                <View style={styles.titleButtonRow}>
                    <Text style={{fontSize:20, color: this.props.headerNameColor}}>{this.props.headerName}</Text>
                    <View style={styles.button}>
                        <Text style={styles.message}>{this.props.editMessage}</Text>
                        {this.props.button}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        flexDirection:'column',
        padding:20,
        paddingBottom:25,
    },
    titleButtonRow:{
        flexDirection:'row',
        justifyContent:"space-between",
    },
    button:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    message:{
        fontSize:16,
        color:'#FFFFFF',
        paddingRight:8
    }
})