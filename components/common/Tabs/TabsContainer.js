import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Tab from './Tab'
import { SuitesContext } from '../../../contexts/SuitesContext';


const TabsContainer = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <View style={styles.container}>
            <View style={styles.tabs}>
                {suitesState.overlayCurrentMenuTabs.map((tab, index)=>{
                    return (tab === suitesState.overlaySelectedMenuTab ? 
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
    );
}
 
export default TabsContainer;

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