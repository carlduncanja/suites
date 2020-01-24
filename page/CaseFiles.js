import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CaseFileListItem from '../components/CaseFiles/CaseFileListItem';
import RoundedPaginator from '../components/CaseFiles/RoundedPaginator';
import FloatingAction from '../components/common/FloatingAction';
import OverlayMenu from '../components/CaseFiles/OverlayMenu';
import Search from '../components/common/Search';
import List from '../components/common/List';
import PageTitle from '../components/common/PageTitle';

export default class CaseFiles extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    render() {
        const caseFiles = require('../assets/db.json').caseFiles
        const listData = (
            <View>
                {caseFiles.map((caseFile,index)=>{
                    return(
                        <View key={index} style={{marginBottom:10}}>
                            <CaseFileListItem caseDetails={caseFile}/>
                        </View> 
                    )
                })}
            </View>
        )
        return(
            <View style={styles.container}>
                <View style={{marginBottom:15}}>
                    <PageTitle pageTitle="Case Files"/>
                </View>
                
                <View style={{marginBottom:30}}>
                    <Search 
                        placeholder="Search by any heading or entry below"
                        placeholderTextColor = "#A0AEC0"
                    />
                </View>
              
                <List 
                    data = {listData}
                    listHeaders = {["Patient","Balance","Staff","Next Visit"]}
                />
                
                <View style={styles.footer}> 
                    <View style={{alignSelf:"center", marginRight:10}}>
                        <RoundedPaginator currentPage={1} totalPages={2}/>
                    </View>
                    <FloatingAction fillColor="#CCD6E0" backgroundColor="#4299E1"/>
                </View>

            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginLeft:5,
        padding:15,
        backgroundColor:'#FAFAFA'
    },
    footer:{
        alignSelf:'flex-end', 
        flexDirection:'row', 
        position:'absolute', 
        bottom:0, 
        marginBottom:20, 
        right:0, 
        marginRight:30
    }
})

