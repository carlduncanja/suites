import React, {Component, useContext, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Action from './Action'
import { SuitesContext } from '../../../contexts/SuitesContext';


const ActionContainer = () => {
    const separator = () => {
        return(
            <View style={{
                backgroundColor:"#E3E8EF",
                borderRadius:2,
                height:1,
                width:'100%',
                marginTop:10,
                marginBottom:10
            }}/>
        )
    }

    const suitesState = useContext(SuitesContext).state
    return ( 
        <View style={styles.container}>
            <View style={styles.actionTitleContainer}> 
                <Text style={styles.title}>{suitesState.floatingActions.actionTitle.toUpperCase()} ACTIONS</Text>
            </View>
            <View style={styles.actionsContainer}>
                <FlatList
                    data={suitesState.floatingActions.actions}
                    renderItem={({ item }) => 
                        <View>
                            <Action
                                modalToOpen="OverlayModal" 
                                action={item}
                            />
                        </View>
                    }
                    keyExtractor={item => item.actionId}
                    ItemSeparatorComponent={separator}
                />
            </View>
        </View>
    );
}
 
export default ActionContainer;

const styles = StyleSheet.create({
    container:{
        //flex:1,
        backgroundColor:'#FFFFFF', 
        width: 218, 
        //height: 70, 
        borderRadius:8, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,    
        elevation: 5,
        paddingLeft: 10,
        paddingRight:10,
        paddingBottom:8,
        //alignSelf:'flex-end'
    }, 
    actionTitleContainer:{
        marginTop: 8,
        alignSelf:'flex-start',
    },
    title:{
        fontSize: 10,
        color:'#A0AEC0',
        //fontFamily: 'Metropolis',
    },
    actionsContainer:{
        //flex:1,
        justifyContent:'space-between',
        marginTop:12,
        flexDirection:'column',

    }
})