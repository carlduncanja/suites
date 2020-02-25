import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Tab from './Tab'
import { SuitesContext } from '../../../contexts/SuitesContext';

const TabsContainer = (props) => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <View style={styles.container}>
            <View style={styles.tabs}>
                {props.tabs.map((tab, index)=>{
                    return (tab === props.selectedTab ? 
                        <View key={index}> 
                            <Tab 
                                tab={tab} 
                                onPressChange = {props.onPressChange}
                                backgroundColor="#FFFFFF" 
                                textColor="#3182CE"/>
                        </View>
                        :
                        <View key={index}>
                            <Tab 
                                tab={tab} 
                                onPressChange = {props.onPressChange}
                                textColor="#718096"/>
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