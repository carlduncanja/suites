import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet } from "react-native";
import { SuitesContext } from '../../../../contexts/SuitesContext';
import Section from '../../../common/SlideOverlay/Section';
import SectionEdit from '../../../common/SlideOverlay/SectionEdit';

const setSection = (section) =>{
    const [state] = useContext(SuitesContext)
    return state.editMode.status === false ? 
        <Section data={section}/>
        :
        <SectionEdit data = {section}/>
}
const Details = () => {
    const [state] = useContext(SuitesContext)
    const sections = []
    Object.keys(state.slideOverlay.slideOverlayTabInfo).forEach(key=>{
        sections.push(state.slideOverlay.slideOverlayTabInfo[key])
    })    

    return ( 
        <View>
            {
                sections.map((section,index)=>{
                    return(index === sections.length-1 ?
                        <View key={index}>
                           {setSection(section)}
                        </View>
                        :
                        <View key={index}>
                            {setSection(section)}
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