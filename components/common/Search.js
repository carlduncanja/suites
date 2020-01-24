import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputText from '../common/InputText';

export default class Search extends Component{
    render(){
        return(
            <View style={styles.container}>
                <InputText 
                    {...this.props}
                />
            </View>
          
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderRadius:8,
        borderWidth:1,
        borderColor:'#CCD6E0',
        backgroundColor:'#FFFFFF',
        padding:10,
    }
})