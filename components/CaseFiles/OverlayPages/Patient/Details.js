import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import Section from '../../../common/SlideOverlay/Section'

const Details = () => {
    const suitesState = useContext(SuitesContext).state
    const sections = []
    Object.keys(suitesState.slideOverlay.slideOverlayTabInfo).forEach(key=>{
        sections.push(suitesState.slideOverlay.slideOverlayTabInfo[key])
    })    

    return ( 
        <View>
            {
                sections.map((section,index)=>{
                    return(index === sections.length-1 ?
                        <View key={index}>
                            <Section data={section}/>
                        </View>
                        :
                        <View key={index}>
                            <Section data={section}/>
                            <View style={styles.separator}/>
                        </View>
                        
                    )
                })
            }
        </View>
    );
}
 
export default Details;

const styles= StyleSheet.create({
    separator:{
        height:1,
        backgroundColor:'#CCD6E0',
        borderRadius:2,
        marginTop:10,
        //marginBottom:10
    }
})