import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import {Text, View, StyleSheet} from 'react-native';
import SvgIcon from '../../assets/SvgIcon';
import TransparentScreen from '../common/TransparentScreen';

export default class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={[styles.logo,
                        {paddingBottom: this.props.screenDimensions.width > this.props.screenDimensions.height ? 10:25}
                    ]}>
                        <SvgIcon iconName = "logo"/>
                    </View>
                    

                    <NavigationBar {...this.props}/>
                </View>
                <View style={{flex:1, position:'absolute',opacity:0.5, backgroundColor:'#104587',height:"2%", width:'100%', top:"98%"}}/>
            </View>
            
            
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        alignItems:'center',
        height: '100%',
        backgroundColor: '#104587',
    },
    logo:{
        paddingTop:10
    }
})
