import React, { Component } from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import TextEditorTest from '../TextEditorTest';
import moment from 'moment';
import SlidingPanel from '../components/common/SlidingPanel';
import LandscapeSchedule from '../components/Schedule/LandscapeSchedule';

export default class CaseFiles extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    render() {
        console.log("Dimen: ", this.props.screenDimensions)
        return(
            <View style={{flex:1}}>
               <SlidingPanel/>
            </View>






        )

    }
}
