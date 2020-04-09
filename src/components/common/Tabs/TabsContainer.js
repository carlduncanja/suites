import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Tab from './Tab'

const TabsContainer = ({tabs, onPressChange, selectedTab, completedTabs}) => {
    return ( 
        <View style={styles.container}>
            {tabs.map((tab, index)=>{
                return (
                    <View key={index}> 
                    <TouchableOpacity onPress = {()=>{onPressChange(tab)}} activeOpacity={1}>
                        <Tab 
                            tabName={tab} 
                            backgroundColor={tab === selectedTab ? "#FFFFFF" : null}
                            textColor={
                                tab === selectedTab ? "#3182CE" :
                                    completedTabs && completedTabs.includes(tab) ? "#4E5664" :
                                        "#718096"
                            }   
                        /> 
                    </TouchableOpacity>
                        
                    </View>
                )
            })}
        </View>
    );
}
 
export default TabsContainer;

const styles = StyleSheet.create({
    container:{
        alignSelf:'flex-start',
        marginLeft:20,
        flexDirection:'row',
    },
    base:{
        height:10,
        width:'100%',
        backgroundColor:"#FFFFFF"
    }
})