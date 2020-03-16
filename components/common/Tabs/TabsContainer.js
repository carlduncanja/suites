import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Tab from './Tab'
import { TouchableOpacity } from 'react-native-gesture-handler';

const TabsContainer = (props) => {
    return ( 
        <View style={styles.container}>
            {props.tabs.map((tab, index)=>{
                return (
                    <View key={index}> 
                    <TouchableOpacity onPress = {()=>props.onPressChange(index)} activeOpacity={1}>
                        <Tab 
                            tabName={tab} 
                            backgroundColor={index === props.selectedTab ? "#FFFFFF" : null}
                            textColor={
                                index === props.selectedTab ? "#3182CE" :
                                    props.completedTabs && props.completedTabs.includes(index) ? "#4E5664" :
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