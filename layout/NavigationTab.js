import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class NavigationTab extends Component {
    render() {
        return (
            <View style={styles.container}>      
                {this.props.tabSelectedBool === true ? 
                    this.props.tabSelected.tabSelected === this.props.tabName ? 
                        <TouchableOpacity style={[styles.navTag,styles.selectedNavTag]} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                            <View style={[styles.navIcon, styles.selectedNavIcon]}/>
                            <Text style={[styles.navText,styles.selectedNavText]}>{this.props.tabName.toUpperCase()}</Text>
                        </TouchableOpacity>  
                        :
                    
                        <TouchableOpacity style={styles.navTag} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                            <View style={styles.navIcon}/>
                            <Text style={styles.navText}>{this.props.tabName.toUpperCase()}</Text>
                        </TouchableOpacity>
                    :

                    <TouchableOpacity style={styles.navTag} onPress={e => this.props.onPressTab(e,this.props.tabName)}>
                        <View style={styles.navIcon}/>
                        <Text style={styles.navText}>{this.props.tabName.toUpperCase()}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        width:'100%',
        marginTop:10,
        marginLeft:8,
    },
    navTag:{
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        paddingBottom:15,
        paddingTop:10,
    },
    selectedNavTag:{
        backgroundColor:'white',
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
    },
    navIcon:{
        height: 20,
        width: 20,
        borderColor:'white',
        borderWidth:1,
        borderRadius:20/2,
    },
    selectedNavIcon:{
        borderColor:'#3182CE',
    },
    navText:{
        fontSize:12,
        marginTop:3,
        color:'#fff',
    },
    selectedNavText:{
       color:'#3182CE',
    },
})