import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SlideContent from './SlideContent'
import SlideHeader from './SlideHeader';
import SlideFooter from './SlideFooter';
import { SuitesContext } from '../../../contexts/SuitesContext';

const SlideOverlay = () => {
    const suitesState = useContext(SuitesContext).state
    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <SlideHeader />
            </View>

            <View style={styles.content}>
               <SlideContent/>
            </View>

            <View style={styles.footer}>
                <SlideFooter/>
                </View> 
        </View>
    );
}
 
export default SlideOverlay;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        backgroundColor:'#EEF2F6',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    content:{
        flex:1,
        margin:30
    },
    footer:{
        flex:1,
        position:'absolute',
        justifyContent:'flex-end',
        alignSelf:'center',
        //top:0,
        bottom:25,
    }
})