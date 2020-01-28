import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CaseFileListItem from '../components/CaseFiles/CaseFileListItem';
import RoundedPaginator from '../components/CaseFiles/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import OverlayMenu from '../components/CaseFiles/OverlayMenu';
import Search from '../components/common/Search';
import List from '../components/common/List/List';
import PageTitle from '../components/common/PageTitle';
import Overlay from '../components/common/Overlay/Overlay';
import SvgIcon from '../assets/SvgIcon'
import TabContainer from '../components/common/Tabs/TabsContainer'
import ActionContainer from '../components/common/FloatingAction/ActionContainer'

export default class CaseFiles extends Component {
    constructor(props){
        super(props);
        this.state={
            toggleFloatingAction:false
        }
    }

    
    onPressFloatingAction(){
        console.log("pRESSED")
        this.setState({toggleFloatingAction:!this.state.toggleFloatingAction})
    }
    render() {
        const caseFiles = require('../assets/db.json').caseFiles
        const detailsFields = 
        [
            {
                "fieldId":"firstname",
                "fieldName":"First Name",
                "fieldType":"text"

            },
            {
                "fieldId":"lastname",
                "fieldName":"Last Name",
                "fieldType":"text"

            },
            {
                "fieldId":"gender",
                "fieldName":"Gender",
                "fieldType":"text"

            },
            {
                "fieldId":"birthdate",
                "fieldName":"Date of Birth",
                "fieldType":"text"

            },
            {
                "fieldId":"middlename",
                "fieldName":"Middle Name",
                "fieldType":"text"

            },
            {
                "fieldId":"title",
                "fieldName":"Title",
                "fieldType":"text"

            },
            {
                "fieldId":"trn",
                "fieldName":"TRN",
                "fieldType":"text"

            },
            {
                "fieldId":"minor",
                "fieldName":"Minor",
                "fieldType":"dropdown",
                "options":["Yes","No"],
                "selected":"No"

            }
        ]
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
        const icons=[
            {
                "iconName":"Patient",
                "icon":<SvgIcon iconName="patientButtonOpen"/>
            },
            {
                "iconName":"Medical Team",
                "icon":<SvgIcon iconName="medicalHistoryButtonClosed"/>
            },
            {
                "iconName":"Procedures",
                "icon":<SvgIcon iconName="procedureButtonClosed"/>
            }
        ]
        const tabs = ["Details","Insurance","Diagnosis","Patient Risk"]
        const actions = [
            {
                "actionId":"archive",
                "actionName":"Archive Case",
                "actionIcon":<SvgIcon iconName="archiveCase" strokeColor="#A0AEC0"/>,
            },
            {
                "actionId":"newCase",
                "actionName":"New Case",
                "actionIcon":<SvgIcon iconName="newCase" strokeColor="#A0AEC0"/>,
            }
        ]
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
                    {this.state.toggleFloatingAction ?
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#A0AEC0" onPressFloatingAction={this.onPressFloatingAction}/>
                        :
                        <FloatingActionButton fillColor="#CCD6E0" backgroundColor="#4299E1"/>
                    }
                    
                </View>
                {/* <Overlay 
                    overlayTitle ="New Case" 
                    footerTitle="Next" 
                    fields={detailsFields}
                    icons={icons}
                    tabs={tabs}
                /> */}
         
                {/* <ActionContainer actionTitle="Case Actions" actions={actions}/> */}
        
                
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

