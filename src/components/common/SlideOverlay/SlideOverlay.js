import React, { useContext } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SlideContent from './SlideContent'
import SlideHeader from './SlideHeader';
import SlideFooter from './SlideFooter';
import { SuitesContext } from '../../../contexts/SuitesContext';

const SlideOverlay = ({selectedItem}) => {

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <SlideHeader
                    id = {selectedItem.id}
                    title = {selectedItem.caseFileDetails.title}
                />
            </View>

            <View style={styles.content}>
               <SlideContent selectedItem = {selectedItem} />
            </View>

            {/* <View style={styles.footer}>
                <SlideFooter/>
            </View>  */}
        </View>
    );
}
 
export default SlideOverlay;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        // backgroundColor:'#EEF2F6',
        // borderTopLeftRadius:30,
        // borderTopRightRadius:30
    },
    content:{
        flex:1,
    },
    footer:{
        flex:1,
        position:'absolute',
        justifyContent:'flex-end',
        paddingBottom:25,
        alignSelf:'center',
        alignItems:'center',
        top:0,
        bottom:0,
        
    }
})