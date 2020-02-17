import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
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
                <View style={styles.content}>
                    <FrameContentImage cardInformation={this.props.cardInformation}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8FAFB'
    },
    title:{
        width:'100%'
    },
    content:{
        width:'100%'
    }
})