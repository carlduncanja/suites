import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import {Text, View, StyleSheet} from 'react-native';
import SvgIcon from '../../assets/SvgIcon';
// import Svg, {Path, Filter, G, Defs } from 'react-native-svg';
import TransparentScreen from '../common/TransparentScreen';

export default class Sidebar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <SvgIcon iconName = "logo"/>
                </View>
                <NavigationBar {...this.props}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        height: '100%',
        paddingTop:'10%',
        backgroundColor: '#104587',
    },
    logo:{
        paddingTop:8,
    }
})
