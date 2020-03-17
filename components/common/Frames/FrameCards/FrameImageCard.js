import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import FrameTitle from '.././FrameTitle'
import FrameContentImage from '../FrameContents/FrameContentImage';

export default class FrameImageCard extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <FrameTitle
                        color={this.props.frameColor}
                        borderColor = {this.props.frameBorderColor}
                        backgroundColor={this.props.titleBackgroundColor}
                        iconName={this.props.frameIconName}
                        frameTitle={this.props.frameTitle}
                    />
                </View>
                <ScrollView style={styles.content} bounces={false}>
                    <FrameContentImage cardInformation={this.props.cardInformation}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8FAFB',
        borderBottomWidth:1,
        borderColor:'#CCD6E0',
        borderTopWidth:0,
    },
    title:{
        width:'100%'
    },
    content:{
        width:'100%',
        height:250
    }
})