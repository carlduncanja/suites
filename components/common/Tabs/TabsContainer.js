import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Tab from './Tab'

export default class TabsContainer extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tabs}>
                    {this.props.tabs.map((tab, index)=>{
                        return (tab === this.props.overlaySelectedTab.selectedTab ? 
                            <View key={index}> 
                                <Tab tab={tab} backgroundColor="#FFFFFF" textColor="#3182CE"/>
                            </View>
                            :
                            <View key={index}>
                                <Tab tab={tab} textColor="#718096"/>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    },
    tabs:{
        marginLeft:20,
        flexDirection:'row'
    },
    base:{
        height:10,
        width:'100%',
        backgroundColor:"#FFFFFF"
    }
})