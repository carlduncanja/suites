import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SvgIcon from '../../../../../../assets/SvgIcon'
import { SuitesContext } from '../../../../../../contexts/SuitesContext';


const PatientTabs = ({ navigation, descriptors }) => {
    const { routes, index } = navigation.state;
    const suitesMethods = useContext(SuitesContext).methods
  
    return (
        <View style={styles.tabs}>
            {routes.map((route, tabIndex) => {
                const { routeName, params } = route;
                const { icon, tabName,  } = params || {};
                const color = tabIndex === index ? '"#3182CE"' : "#718096";
                const backgroundColor = tabIndex === index ? "#FFFFFF" : null;
    
                return (
                    <View style={styles.container}>
                        <View style={styles.corner}>
                            <SvgIcon iconName="tabLeft" fillColor={backgroundColor}/>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(routeName);
                                suitesMethods.handleOverlayTabChange(tabName)
                            }}
                            activeOpacity={1}
                            style={[styles.tabContainer,{backgroundColor:backgroundColor}]}
                            key={route.routeName}
                        >
                            <Text style={[styles.text,{color:color}]}>{tabName}</Text>
                        </TouchableOpacity>
                        <View style={styles.corner}>
                            <SvgIcon iconName="tabRight" fillColor={backgroundColor}/>
                        </View>

                    </View>
                    
                );
            })}
        </View>
          
     
    );
  };
 
export default PatientTabs;

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
    },
    container:{
        flexDirection:'row',
        marginRight:15,
    },
    tabContainer:{
        borderTopLeftRadius: 8,
        borderTopRightRadius:8,
        padding:5,
        paddingLeft:10,
        paddingRight:10
    },
    text:{
        fontSize:16,
        //color:'#3182CE'
    },
    corner:{
        alignSelf:'flex-end'
    }
})