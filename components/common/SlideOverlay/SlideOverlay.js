import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, SectionList} from 'react-native';
import TabsContainer from '../Tabs/TabsContainer'
import SlideContent from './SlideContent'
import SlideHeader from './SlideHeader';


export default class SlideOverlay extends Component{
    getTabs(){
        filterMenuItem = this.props.menuIcons.filter(item => item.tabName === this.props.selectedMenuTab)
        tabs = filterMenuItem[0].overlayTab
        return tabs
    }

    render(){
        return(
            <View style={styles.container}>

                <View style={styles.header}>
                    <SlideHeader 
                        headerId = {this.props.headerId}
                        headerName={this.props.headerName}
                        tabs = {this.getTabs()}
                        overlaySelectedTab={this.props.overlaySelectedTab}
                    />
                </View>

                <View style={styles.content}>
                    <SlideContent overlayDetails={this.props.overlayDetails}/>
                </View>

                <View style={styles.footer}>
                    {this.props.footer}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        backgroundColor:'#EEF2F6'
    },
    content:{
        flex:1,
    },
    footer:{
        position:'absolute',
        justifyContent:'flex-end',
        alignSelf:'center',
        top:0,
        bottom:20
    }
})