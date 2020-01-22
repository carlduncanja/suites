import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import InputText from './InputText';
import Svg, {Path} from 'react-native-svg';
import SvgIcon from '../../assets/SvgIcon'

export default class SearchBar extends Component {
    render() {
        let currentItem = this.props.selectedAppEvents.length === 0 ? 0 : this.props.searchResult
        return (
            <View style={styles.searchContent}>
                <InputText
                    changeText = {this.props.changeText}
                    inputText = {this.props.inputText}
                    placeholderTextColor = {this.props.placeholderTextColor}
                    placeholder={this.props.placeholder}
                />
                <View style={{flexDirection: 'row'}}>
                    {this.props.selectedSearchValue === ""? 
                        null
                        :
                        <View style={{flexDirection:'row', paddingRight:15}}>
                            <Text>{currentItem} of {this.props.selectedAppEvents.length}</Text>
                            <TouchableOpacity style={{paddingRight:15, paddingLeft:15}} onPress={() => this.props.prevSearchResult()}>
                                <SvgIcon iconName = "scheduleMonthLeft" strokeColor = "#718096"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingLeft:15, paddingRight:15}} onPress = {() => this.props.nextSearchResult()}>
                                <SvgIcon iconName = "scheduleMonthRight" strokeColor = "#718096"/>
                            </TouchableOpacity>
                        </View>
                    }
                    
                    <TouchableOpacity onPress={this.props.closeSearch}>
                        <SvgIcon iconName = "searchExit" strokeColor = "#718096"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    searchContent:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:26,
        paddingBottom:24
    },
    entry:{
        fontSize:29,
    },
    exit:{

    }
})
