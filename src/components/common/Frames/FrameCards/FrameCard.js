import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameContentList from '../FrameContents/FrameContentList';

export default class FrameCard extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <FrameTitle
                        color={this.props.frameColor}
                        borderColor = {this.props.frameBorderColor}
                        backgroundColor={this.props.titleBackgroundColor}
                        icon={this.props.icon}
                        // iconFillColor = {this.props.iconFillColor}
                        frameTitle={this.props.frameTitle}
                    />
                </View>
                <View style={styles.content}>
                    <FrameContentList
                        cardInformation={this.props.cardInformation}
                        frameColor = {this.props.frameColor}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8FAFB',

    },
    title:{
        width:'100%'
    },
    content:{

        width:'100%'
    }
})
