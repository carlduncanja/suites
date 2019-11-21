import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import InputText from '../components/InputText';
import Svg, {Path} from 'react-native-svg';

export default class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchContent}>
                <InputText 
                    changeText = {this.props.changeText}
                    inputText = {this.props.inputText}
                    placeholderTextColor = {this.props.placeholderTextColor}
                    placeholder={this.props.placeholder}
                />

                <TouchableOpacity onPress={this.props.closeSearch}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M13.5 2.5L2.5 13.5" stroke="#4A5568" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M2.5 2.5L13.5 13.5" stroke="#4A5568" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                </TouchableOpacity>
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
