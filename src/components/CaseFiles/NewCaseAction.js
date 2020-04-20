import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Overlay from '../common/Overlay/Overlay';
import ProgressContainer from '../common/Progress/ProgressContainer';
import SvgIcon from '../../../assets/SvgIcon';
import PatientIcon from '../../../assets/svg/newCasePatient';
import ProcedureIcon from '../../../assets/svg/newCaseProcedure';
import MedicalIcon from '../../../assets/svg/newCaseMedical';

const NewCaseAction = () => {

    // ############# CONST 
    const wizard = [
        {
            step : 
                {
                    name :'Patient',
                    selectedIcon : <PatientIcon fillColor = {'#0CB0E7'} strokeColor = {'#64D8FF'}/>,
                    disabledIcon : <PatientIcon fillColor = {'#A0AEC0'} strokeColor={'#CCD6E0'}/>,
                    progress : 0
                },
            tabs : ['Details', 'Contact', 'Address', 'Insurance Coverage']
        },
        {
            step : 
                {
                    name :'Medical Team',
                    selectedIcon : <MedicalIcon fillColor = {'#E53E3E'}/>,
                    disabledIcon : <MedicalIcon fillColor = {'#CBD5E0'}/>,
                    progress : 0
                },
            tabs : ['Assignment 1', 'Assignment 2']
        },
        {
            step : 
                {
                    name :'Procedures',
                    selectedIcon : <ProcedureIcon fillColor = {'#319795'} strokeColor={'#81E6D9'}/>,
                    disabledIcon : <ProcedureIcon fillColor = {'#A0AEC0'} strokeColor={'#CCD6E0'}/>,
                    progress : 0
                },
            tabs : ['Procedure 1', 'Procedure 2']
        }
    ]

    const steps = [...wizard.map( step => step.step )]

    // ############# STATE 

    const [title, setTitle] = useState('New Case');
    const [footerTitle, setFooterTitle] = useState('NEXT')
    
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [selectedStep, setSelectedStep] = useState(steps[selectedIndex].name)
    const [tabs, setTabs] = useState(wizard[selectedIndex].tabs)

    const [selectedTab, setSelectedTab] = useState(wizard[selectedIndex].tabs[selectedTabIndex])

    const [completedSteps, setCompletedSteps] = useState([])
    const [completedTabs, setCompletedTabs] = useState([])

    

    // ############# Event Handlers

    const handleStepPress = (name) => {

        if (completedSteps.includes(name)){

            const stepsCopy = completedSteps
            const selectedIndex = completedSteps.findIndex( step => step === name)
            const stepsIndex = steps.findIndex( step => step.name === name)
            const updatedSteps = stepsCopy.slice(0,selectedIndex)

            if (stepsIndex !== steps.length-1){
                setFooterTitle('NEXT')
            }
           
            setSelectedIndex(stepsIndex)
            setSelectedStep(name)
            setCompletedSteps(updatedSteps)


        }
    }

    const handleTabPress = (name) => {
        
        if (completedTabs.includes(name)){
            const tabsCopy = completedTabs
            const completedFilterTabIndex = completedTabs.findIndex(tab => tab === name)
            const selectedFilterTabIndex = tabs.findIndex(tab => tab === name)
            const updatedTabs = tabsCopy.slice(0,completedFilterTabIndex)

            setSelectedTabIndex(selectedFilterTabIndex)
            setSelectedTab(name)
            setCompletedTabs(updatedTabs)
        }
    }

    const handleFooterPress = () => {

        if (selectedTabIndex !== tabs.length -1){
            const updatedTabIndex = selectedTabIndex + 1

            setCompletedTabs([...completedTabs,tabs[selectedTabIndex]])
            setSelectedTabIndex(updatedTabIndex)
            setSelectedTab(tabs[updatedTabIndex])

        }else if (selectedIndex === steps.length-1 && selectedTabIndex === tabs.length-1) {
            setFooterTitle('CONTINUE')
            setCompletedSteps([...completedSteps,steps[selectedIndex].name])
        }else{
            const updatedIndex = selectedIndex + 1
            setCompletedSteps([...completedSteps,steps[selectedIndex].name])
            setSelectedIndex(updatedIndex)
            setSelectedStep(steps[updatedIndex].name)

            const tabs = wizard[updatedIndex].tabs
            setTabs(tabs)
            setSelectedTabIndex(0)
            setCompletedTabs([])
            setSelectedTab(tabs[0])
        }
       
        // if(selectedIndex === steps.length-1){
        //     setFooterTitle('CONTINUE')
        // }else{
        //     const updatedIndex = selectedIndex + 1
        //     setCompletedSteps([...completedSteps,steps[selectedIndex].name])
        //     setSelectedIndex(updatedIndex)
        //     setSelectedStep(steps[updatedIndex].name)
            
        // } 
    }

    // ############# Component declarations 

    const headerContent = <ProgressContainer
        steps = {steps}
        handleStepPress = {handleStepPress}
        selectedStep = {selectedStep}
        completedSteps = {completedSteps}
    />

    return (
        <View style={styles.container}>
            <Overlay
                title = {title}
                hasTabsHeaderContent = {true}
                tabs = {tabs}
                handleTabPress = {handleTabPress}
                completedTabs = {completedTabs}
                selectedTab = {selectedTab}
                tabsHeaderContent = {headerContent}
                footerTitle = {footerTitle}
                handleFooterPress = {handleFooterPress}
            />
        </View>

    )
}

export default NewCaseAction

const styles = StyleSheet.create({
    container:{
        // flex:1,
        width:600,
        height:700,
        backgroundColor:'#FFFFFF',
        alignSelf:'flex-end',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#EEF2F6',

    },
})