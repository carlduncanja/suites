import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SvgIcon from '../assets/SvgIcon'
import MultipleLineRecord from '../components/common/List/MultipleLineRecord';
import moment from 'moment'
import Page from '../components/common/Page/Page';
import SlideOverlay from '../components/common/SlideOverlay/SlideOverlay';
import OverlayMenuBar from '../components/common/OverlayMenuBars/OverlayMenuBar';
import { SignsAndSymptoms } from '../components/CaseFiles/OverlayCardFrames'

export default class CaseFiles extends Component {
    constructor(props){
        super(props);
        this.state={
            caseFiles:require('../assets/db.json').caseFiles.caseInformation,
            //Pagination States
            currentPage:1,
            recordsPerPage:20,
            sliceArrayStart:0,
            sliceArrayEnd:20,
            //Floating Action 
            actionButtonState:false,
            //SlidePanelOverlay
            selectedCaseFile:null,
            //List
            checked:false,
            //MenuTab
            selectedMenuTab:"Patient",
            overlaySelectedTab:{"menuTab":"Patient","selectedTab":"Details"}
        }
    }

    getListData(){
        let listData = [];
        this.state.caseFiles.map((caseFile)=>{
            newArray = 
                {
                    "recordId":caseFile.patientId,
                    "recordInformation":
                    [
                        <MultipleLineRecord name = {`${caseFile.patientName.first} ${caseFile.patientName.last}`} id={caseFile.patientId}/>,
                        <Text style={styles.itemText}>{caseFile.balance}</Text>,
                        <Text style={styles.itemText}>{caseFile.staff}</Text>,
                        <Text style={styles.itemText}>{ moment(caseFile.nextVisit).format("MMM D, YYYY")}</Text>
                    ]
                }
                
            listData.push(newArray)
        })

        return listData
    }

    //Pagination Methods

    getTotalPages(){
        return( Math.ceil(this.state.caseFiles.length/this.state.recordsPerPage))
    }

    previousPage(){
        if(this.state.currentPage !== 1){
            this.setState({
                currentPage:this.state.currentPage - 1,
                sliceArrayStart:this.state.sliceArrayStart - this.state.recordsPerPage,
                sliceArrayEnd:this.state.sliceArrayEnd - this.state.recordsPerPage
            })
        }
        
    }

    nextPage(){
        if (this.state.currentPage !== this.getTotalPages()){
            this.setState({
                currentPage:this.state.currentPage + 1,
                sliceArrayStart:this.state.sliceArrayStart + this.state.recordsPerPage,
                sliceArrayEnd:this.state.sliceArrayEnd + this.state.recordsPerPage
            })
        }
    }

    //Floating Action Button Methods

    toggleActionButton(){
        this.setState({actionButtonState: !this.state.actionButtonState})
    }

    // SlideUpPanelOverlay Methods

    setSelected(patientId){
        this.setState({
            checked:true,
            selectedCaseFile:patientId
        })
    }

    getSelectedCaseInformation(){
        let data = require('../assets/db.json').caseFiles.caseDetails;
        // const filterFiles = data.filter(item => item.patientId === this.state.selectedCaseFile)
        const filterFiles = data.filter(item => item.patientId === "#350219385001")
        let file = filterFiles[0].overlayCaseInformation
        return file
    }

    //List Methods
    toggleCheckbox(patientId){
        this.setState({
            checked: true,
            selectedCaseFile:patientId
        })
    }

    //Menu Tab
    setSelectedMenuTab(tabName){
        filterTabs = require('../assets/db.json').caseFiles.menuTabs.filter(item => item.tabName === tabName )
        this.setState({
            selectedMenuTab:tabName,
            overlaySelectedTab:{"menuTab":tabName,"selectedTab":filterTabs[0].overlayTab[0]}
        })
    }


    render() {
        const menuIcons = require('../assets/db.json').caseFiles.menuTabs
        const footer = 
            <OverlayMenuBar 
                menuIcons = {menuIcons}
                selectedMenuTab = {this.state.selectedMenuTab}
                setSelectedMenuTab = {this.setSelectedMenuTab.bind(this)}
                fillColor="grey"
                backgroundColor="#FFFFFF"
            />
        const actions = [
    
            {"actionId":"archiveCase",
            "actionName":"Archive Case"
            },
        {
            "actionId":"newCase",
            "actionName":"New Case"
        }
        ]
            
       

        return(
            // <Page
            //     //Page States and Methods
            //     pageTitle="Case Files"
            //     searchPlaceholder="Search by any heading or entry below"
            //     data = {this.getListData()}
            //     listHeaders = {["Patient","Balance","Staff","Next Visit"]}

            //     //Methods
            //     toggleCheckbox={this.toggleCheckbox.bind(this)}
            //     checked = {this.state.checked}
            //     selectedCaseFile = {this.state.selectedCaseFile}
            //     // Pagination States and Methods
            //     sliceArrayStart = {this.state.sliceArrayStart}
            //     sliceArrayEnd = {this.state.sliceArrayEnd}   
            //     previousPage={this.previousPage.bind(this)}      
            //     nextPage={this.nextPage.bind(this)}
            //     currentPage={this.state.currentPage}
            //     totalPages={this.getTotalPages()}
            //     // Floating Action States and Methods
            //     toggleActionButton = {this.toggleActionButton.bind(this)}
            //     actionButtonState = {this.state.actionButtonState}
            //     actions = {actions}
            //     actionTitle = "Case Files"
            //     //SlideUpPanelOverlay
            //     setSelected = {this.setSelected.bind(this)}
            // />

            <SlideOverlay
                overlayDetails={this.getSelectedCaseInformation()}
                menuIcons = {menuIcons}
                headerId = {this.state.caseFiles[0].patientId}
                headerName = {`${this.state.caseFiles[0].patientName.first} ${this.state.caseFiles[0].patientName.middle} ${this.state.caseFiles[0].patientName.last}`}
                selectedMenuTab = {this.state.selectedMenuTab}
                overlaySelectedTab={this.state.overlaySelectedTab}
                footer={footer}
            />
            // <SignsAndSymptoms cardInformation={["Upset Stomach", "High Temperature"]}/>
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

