import React,{Component, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Tab from './Tab'
import { SuitesContext } from '../../../contexts/SuitesContext';

const TabsContainer = (props) => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <View style={styles.container}>
            {props.tabs.map((tab, index)=>{
                return (
                    <View key={index}> 
                        <Tab 
                            tabName={tab} 
                            tabIndex = {index}
                            onPressChange = {props.onPressChange}
                            backgroundColor={index === props.selectedTab ? "#FFFFFF" : null}
                            textColor={
                                index === props.selectedTab ? "#3182CE" :
                                    props.completedTabs && props.completedTabs.includes(index) ? "#4E5664" :
                                        "#718096"
                            }   
                        /> 
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