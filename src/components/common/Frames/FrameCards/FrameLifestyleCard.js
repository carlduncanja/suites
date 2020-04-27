import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import FrameTitle from '../FrameTitle';
import FrameLifestyleContent from '../FrameContents/FrameLifestyleContent';
import {transformToSentence} from '../../../../hooks/useTextEditHook'

const FrameLifestyleCard = (props) => {
    return (
        <View style={styles.container}>
                <View style={styles.title}>
                    <FrameTitle
                        color={props.frameColor}
                        borderColor = {props.frameBorderColor}
                        backgroundColor={props.titleBackgroundColor}
                        icon={props.icon}
                        frameTitle={props.frameTitle}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.titleName}>{transformToSentence(props.cardInformation.name)}</Text>
                    <FrameLifestyleContent cardInformation={props.cardInformation}/>
                </View>
            </View>
    );
}

export default FrameLifestyleCard;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8FAFB',
    },
    title:{
        width:'100%'
    },
    content:{
        width:'100%',
        padding:15,
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderTopWidth:0,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    titleName:{
        color:"#4E5664",
        fontSize:16,
    }
})
