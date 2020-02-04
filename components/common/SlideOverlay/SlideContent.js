import React,{Component} from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import Section from './Section';

export default class SlideContent extends Component{
    separator() {
        return(
            <View style={{
                backgroundColor:"#E3E8EF",
                borderRadius:2,
                height:1,
                width:'100%',
                marginTop:10,
                marginBottom:10
            }}/>
        )
    }
    render(){
        const sections = []
        Object.keys(this.props.overlayDetails).forEach(key=>{
            sections.push(this.props.overlayDetails[key])
        })    

        const sectionsArray = []
        sections.map((section,index)=>{
            sectionsArray.push(
                {
                    "title":`Section${index}`,
                    "data":[
                        <View key={index}>
                            <Section data={section}/>
                        </View>
                    ]
                }
                
            )
        })

        
        
        return(
            <View style={{flex:1}}>
                {/* <SectionList
                    sections={sectionsArray}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => item}
                    ItemSeparatorComponent={this.separator}
                /> */}
                {
                    sections.map((section,index)=>{
                        return( index === -1 ?
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
        )
    }
}

const styles= StyleSheet.create({
    separator:{
        height:1,
        backgroundColor:'#CCD6E0',
        borderRadius:2,
        marginTop:10,
        marginBottom:10
    }
})