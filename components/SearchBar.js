import React, { Component } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class SearchBar extends Component {
    render() {
        return (
           <View style={styles.container}>
                <TextInput 
                    style={styles.entry}
                    onChangeText={text => this.props.onChangeSearchText(text)}
                    value={this.props.searchValue}
                    placeholder={this.props.searchPlaceholder}
                    />
                <View style={styles.exit}>
                    <Icon name="close" size={15} />
                </View>
           </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft:20,
        flexDirection:'row',
    },
    entry:{
        fontSize:29,
    },
    exit:{

    }
})
