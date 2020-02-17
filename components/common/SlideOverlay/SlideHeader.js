import React,{Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewModeHeading } from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'

export default class SlideHeader extends Component{
    render(){
        return(
            <View>
                <ViewModeHeading/>
                <TabsContainer />
            </View>
            
        )
    }
}