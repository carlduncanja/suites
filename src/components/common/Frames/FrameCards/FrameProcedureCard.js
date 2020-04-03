import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameProcedureContent from '../FrameContents/FrameProcedureContent';

const FrameProcedureCard = (props) => {
    return ( 
        <View style={styles.container}> 
            <View style={styles.title}>
                <FrameTitle
                    color="#718096" 
                    borderColor = "#E3E8EF"
                    backgroundColor="#F8FAFB"
                    iconName="overlayProcedures"
                    frameTitle={props.information.title}
                />
            </View>

            <View style={styles.content}>
                <FrameProcedureContent details = {props.information} onOpenPickList={props.onOpenPickList}/>
            </View> 
        </View>
    );
}
 
export default FrameProcedureCard;

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