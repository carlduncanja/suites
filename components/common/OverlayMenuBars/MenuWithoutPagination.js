import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectedMenuIconTab from '../../CaseFiles/SelectedMenuIconTab';
import FloatingActionButton from '../FloatingAction/FloatingActionButton';

export default class MenuWithoutPagination extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.menuBar}>
                    <View>
                        <SelectedMenuIconTab
                            menuIcons = {this.props.menuIcons}
                            selectedMenuTab = {this.props.selectedMenuTab}
                            setSelectedMenuTab = {this.props.setSelectedMenuTab}
                        />
                    </View>
                    <View style={styles.selectedIconContainer}>
                        <Text style={styles.selectedText}>{this.props.selectedMenuTab}</Text>
                    </View>
                </View>
                <FloatingActionButton
                    fillColor={this.props.fillColor}
                    backgroundColor={this.props.backgroundColor}
                />
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    menuBar:{
        flexDirection:"row",
        backgroundColor:'#FFFFFF',
        borderRadius:32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,    
        elevation: 5,
        alignSelf:"flex-end",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
        marginRight:10,
    },
    selectedIconContainer:{
        paddingLeft:15,
        justifyContent:"center",
        marginRight:'10%'
    },
    selectedText:{
        fontSize:16,
        color:'#323843'
    }
})