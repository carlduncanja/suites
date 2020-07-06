import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameProcedureContent from '../FrameContents/FrameProcedureContent';

const FrameProcedureCard = (props) => { 
    const { information = {}, icon, onOpenPickList } = props
    const {appointment = {}} = information
    const { title = "", subject="" } = appointment
    return ( 
        <View style={styles.container}> 
            <View style={styles.title}>
                <FrameTitle
                    color="#718096"  
                    borderColor = "#E3E8EF"
                    backgroundColor="#F8FAFB"
                    icon={icon}
                    frameTitle={`${title} - ${subject}`}
                />
            </View>

            <View style={styles.content}>
                <FrameProcedureContent details = {information} onOpenPickList={onOpenPickList}/>
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