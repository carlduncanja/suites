import React,{Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewModeHeading } from '../Headings/Headings'
import TabsContainer from '../Tabs/TabsContainer'

export default class SlideHeader extends Component{
    render(){
        return(
            <View>
                <ViewModeHeading
                    headerId={this.props.headerId}
                    headerName={this.props.headerName}
                />
                <TabsContainer 
                    tabs={this.props.tabs} 
                    overlaySelectedTab={this.props.overlaySelectedTab}
                />
            </View>
            
        )
    }
}