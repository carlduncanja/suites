import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import Schedule from '../Schedule/Schedule';
import CaseFiles from '../CaseFiles/CaseFiles';
import SlideUpPanel from '../components/SideUpPanel';
import SlideLeftPanel from '../components/SlideLeftPanel';
import LandscapeSchedule from '../Schedule/LandscapeSchedule'


export default class Content extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        return (
            <View style = {styles.content}>
                {this.props.name === 'SCHEDULE' ? 
                    this.props.screenDimensions.width < this.props.screenDimensions.height ?
                    <Schedule {...this.props} />
                    :
                    <LandscapeSchedule {...this.props}/>
                    :
                    this.props.name === 'CASE FILES' ?
                        <CaseFiles {...this.props}/>
                        :
                        this.props.name === 'PATIENTS' ?
                            <SlideLeftPanel {...this.props}/>
                            :
                            this.props.name === 'INVENTORY' ?
                                <View style={{height:'50%', backgroundColor:'red', zIndex:-1}}/>
                                :
                                this.props.name === 'DELIVERY' ?
                                    <Text>DELIVERY</Text>
                                    :
                                    this.props.name === 'EQUIPMENTS' ?
                                        <Text>DELIVERY</Text>
                                        :
                                        this.props.name === 'ALERTS' ?
                                            <Text>ALERTS</Text>
                                            :
                                            <Text>HOME</Text>
                } 
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:3,
    }
})