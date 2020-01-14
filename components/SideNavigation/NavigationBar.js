import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, SectionList} from 'react-native';
import NavigationTab from './NavigationTab';
import Schedule from '../../page/Schedule';

const sections=
    [
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

    const tabs = ['schedule','case files','theatres','inventory','equipment','orders','suppliers','invoices','storage','physicians','procedures','alerts']

export default class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            scrollValue: 0,
            enableScroll: true,
            tabYValues: [],
            selectedTab: 'schedule',
            topTag:'schedule'
        }
        this.setScrollValue = this.setScrollValue.bind(this)
        this.setTabYValues = this.setTabYValues.bind(this)
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

    setScrollValue(value){
        this.setState({scrollValue:value})
    }

    setTabYValues(obj){
        this.setState({tabYValues: [...this.state.tabYValues,obj]})
    }

    componentDidUpdate(prevProps){
        if (prevProps.tabSelected.tabSelected !== this.props.tabSelected.tabSelected) {
            this.setState({enableScroll:true})
            this.getTopTab()
        }     
    }

    getTopTab(){
        let tabsArray = this.state.tabYValues.sort((a,b)=>a.tabValue - b.tabValue);
        tabsArray.map((tab)=>{
            if(this.props.tabSelected.tabSelected === tab.tabName){
                if (this.state.scrollValue >= tab.tabValue){
                    this.setState({enableScroll:false})
                } 
            }
        })
    }

    render() {     
        return (
            <ScrollView 
                onScroll = {event => {this.setScrollValue(event.nativeEvent.contentOffset.y); this.getTopTab()}}
                scrollEventThrottle={2}
                scrollEnabled={this.state.enableScroll}
                showsVerticalScrollIndicator={false}
                style={[styles.container]} 
                contentContainerStyle={{alignItems:'center',justifyContent:'flex-start',width:'100%'}}
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
                    return (tab === 'theatres' || tab === 'invoices' || tab === 'procedures' || tab === 'alerts' ?

                        <View 
                            style = {{width:'100%'}} 
                            onLayout={event => this.setTabYValues({'tabName':tab, 'tabValue':event.nativeEvent.layout.y})}
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
                            onLayout={event => this.setTabYValues({'tabName':tab, 'tabValue':event.nativeEvent.layout.y})}
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