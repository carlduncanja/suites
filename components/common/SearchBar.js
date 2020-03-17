import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import InputText from './InputText';
import Svg, {Path} from 'react-native-svg';
import SvgIcon from '../../assets/SvgIcon'

export default class SearchBar extends Component {
    render() {
        //let currentItem = this.props.selectedAppEvents.length === 0 ? 0 : this.props.searchResult
        return (
            <View style={styles.searchBar}>
                <View style={[styles.container, styles.searchContent]}>
                    <View style={{flexDirection:'row'}}> 
                        <SvgIcon iconName="search" strokeColor="#A0AEC0"/>
                        <InputText
                            changeText = {this.props.changeText}
                            inputText = {this.props.inputText}
                            placeholderTextColor = "#A0AEC0"
                            placeholder="Coronary Bypass Graft"
                        />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#3182CE', fontSize:12, paddingRight:8}}>3 matches found</Text>
                        {/* <Text style={{color:'#3182CE', fontSize:12, paddingRight:8}}>{this.props.selectedAppEvents.length} matches found</Text> */}
                        <TouchableOpacity activeOpacity={1}>
                            <SvgIcon iconName="searchExit" strokeColor="#718096"/>
                        </TouchableOpacity>
                        
                    </View>
                </View>

                <View style={[styles.container,styles.control]}>
                    <TouchableOpacity style={{padding:8, paddingLeft:6}} onPress={() => this.props.prevSearchResult()}>
                        <SvgIcon iconName = "scheduleMonthLeft" strokeColor = "#718096"/>
                    </TouchableOpacity>
                    <View style={{borderWidth:1, borderColor:'#E3E8EF'}}/>
                    <TouchableOpacity style={{padding:8, paddingRight:6}} onPress = {() => this.props.nextSearchResult()}>
                        <SvgIcon iconName = "scheduleMonthRight" strokeColor = "#718096"/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity activeOpacity={1} style={[styles.container,{marginLeft:10, paddingLeft:12, paddingRight:12}]}>
                    <Text style={{color:'#0CB0E7', fontSize:16}}>Done</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles=StyleSheet.create({
    searchBar:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#FAFAFA',
        padding:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 8,
    },
    container:{
        flexDirection:'row',
        backgroundColor:"#F8FAFB",
        borderWidth:1,
        borderColor:'#E3E8EF',
        borderRadius:8,
        padding:8,
        paddingLeft:6,
        paddingRight:6,
    },
    searchContent:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between'
    },
    control:{
        backgroundColor:'#FFFFFF',
        marginLeft:10,
        padding:0,
    },
})
