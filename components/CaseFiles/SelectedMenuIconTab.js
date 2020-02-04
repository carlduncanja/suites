import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import SvgIcon from '../../assets/SvgIcon'

export default class SelectedMenuIconTab extends Component{
    render(){
        return(
            <View style={styles.iconContainer}>
                {this.props.menuIcons.map((icon,index)=>{
                    return (
                        this.props.selectedMenuTab === icon.tabName ?
                            <TouchableOpacity key={index} style={styles.icon} onPress={()=>this.props.setSelectedMenuTab(icon.tabName)}>
                                <SvgIcon iconName={`${icon.tabId}Open`}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity key={index} style={styles.icon} onPress={()=>this.props.setSelectedMenuTab(icon.tabName)}>
                                <SvgIcon iconName={`${icon.tabId}Closed`}/>
                            </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconContainer:{
        flexDirection:"row",
        borderRightWidth:1,
        borderRightColor:"#CCD6E0"
    },
    icon:{
        paddingRight:20,
    }
})