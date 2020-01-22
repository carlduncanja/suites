import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, SectionList} from 'react-native';
import NavigationTab from './NavigationTab';
import Schedule from '../../page/Schedule';

const sections=
    [
        {   "title":"quickMenu",
            "data" : ['quick menu']
        },
        {
            "title": "appointmentSection",
            "data" : ['schedule','case files','theatres']
        },
        {
            "title": "inventorySection",
            "data" : ['inventory','equipment','orders','suppliers','invoices']
        },
        {
            "title": "staffSection",
            "data" : ['storage','physicians','procedures']
        },
        {
            "title": "alertSection",
            "data" : ['alerts']
        }
    ];

    const tabs = ['quick menu', 'schedule','case files','theatres','inventory','equipment','orders','suppliers','invoices','storage','physicians','procedures','alerts']

export default class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
           stickyIndex:1
        }
       
    }

        
    seperateTabs(){
        const tabs = []
        const fixed = []
        const scroll = []
        sections.map((section)=>{
            section.tabs.map((tab)=>{
                tabs.includes(tab)?
                    null:
                    tabs.push(tab)
            })  
        })
        const selectedIndex = tabs.indexOf(this.props.tabSelected.tabSelected)

        for(i = 0; i <= selectedIndex; i ++){
            fixed.push(tabs[i])
        }
        for(i = selectedIndex+1; i < tabs.length; i++){
            scroll.push(tabs[i])
        }
        return [fixed, scroll]
    }

    handlePress=()=>{
        this.props.navigation.navigate('schedule')
    }
    
    render() {    
        // console.log("Index: ", tabs.indexOf(this.props.tabSelected.tabSelected))
        return (            
            <ScrollView 
                stickyHeaderIndices={[tabs.indexOf(this.props.tabSelected.tabSelected)]}
                //invertStickyHeaders={[tabs.indexOf(this.props.tabSelected.tabSelected)]}
                scrollEventThrottle={2}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={[styles.container]} 
                contentContainerStyle={{alignItems:'center',justifyContent:'flex-start',width:'100%'}}
                //bounces={false}
           >
                {/* <SectionList
                    style={{width:'100%'}}
                    sections = {sections}
                    renderItem = {({item})=> 
                        <NavigationTab 
                            tabName = {item}
                            {...this.props}
                        /> 
                    }

                    renderSectionFooter = {(section, index) => 
                        <View style={{width:'80%', alignSelf:'center', height:1, backgroundColor:'#4879B7', borderRadius:2}}/>
                    }
                    keyExtractor = {(tabName, index) => index}
                /> */}

                {/* {sections.map((section, index)=>{
                    return(
                        <View style={{width:'100%', alignSelf:'center'}} key={index}>
                            {section.data.map((tab, index)=>{
                               
                                return( 
                                    <NavigationTab 
                                        section={section.title}
                                        key={index} 
                                        tabName = {tab}
                                        {...this.props}
                                    /> 
                                )
                                
                            })}
                            <View style={{width:'80%', alignSelf:'center', height:1, backgroundColor:'#4879B7', borderRadius:2}}/>
                        </View>
                    )
                })} */}

                {tabs.map((tab, index)=>{
                    return (tab === 'quick menu' ,tab === 'theatres' || tab === 'invoices' || tab === 'procedures' || tab === 'alerts' ?

                        <View 
                            style = {{width:'100%'}} 
                            //onLayout={event => this.setTabYValues({'tabName':tab, 'tabValue':event.nativeEvent.layout.y})}
                            key={index}
                        >
                            <NavigationTab 
                                tabName = {tab}
                                {...this.props}
                            /> 
                            <View style={{width:'80%', alignSelf:'center', height:1, backgroundColor:'#4879B7', borderRadius:2}}/>
                        </View>
                        :
                        <View 
                            style={{width:'100%'}} 
                            //onLayout={event => this.setTabYValues({'tabName':tab, 'tabValue':event.nativeEvent.layout.y})}
                            key={index}
                        >
                            <NavigationTab 
                                key={index} 
                                tabName = {tab}
                                {...this.props}
                            /> 
                        </View>
                        
                    )
                })} 
                
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,  
        width:'100%',
        flexDirection: 'column',
        // alignItems:'center',
        // justifyContent:'flex-start',
    },
})