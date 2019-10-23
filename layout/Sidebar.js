import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import {Text, View, StyleSheet} from 'react-native';


export default class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}/>
                <NavigationBar {...this.props}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        height: '100%',
        paddingTop:6,
        backgroundColor: '#104587',
    },
    logo:{
        height: 35,
        width: 35,
        borderRadius:35/2,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'white',
    }
})
