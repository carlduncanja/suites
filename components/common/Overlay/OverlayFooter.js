import React,{Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import {caseActions} from '../../../reducers/caseFilesReducer';
import {handleProgressBar} from '../../../helpers/caseFilesHelpers'

const OverlayFooter = () => {
    const [state, dispatch] = useContext(CaseFileContext)
    const progressList = state.progressBar.progressList;
    const selectedStep = state.newItemAction.selectedStep;
    const tabLength = state.newItemAction.currentStepTabs.length 

    const handleBar = (index) =>{
        const updatedList = handleProgressBar(index, progressList, selectedStep,tabLength )
        dispatch({
            type : caseActions.UPDATEPROGRESSBARLIST,
            newState : {progressList:updatedList}
        })
    }
    const handleNewItemTabChange =()=>{    
        state.newItemAction.selectedTab === state.newItemAction.currentStepTabs.length-1 ? 
            handleStepChange() 
            :
            (
                dispatch({
                    type : caseActions.NEWITEMTABCHANGE,
                    newState : {
                        tabsCompletedList : [...state.newItemAction.tabsCompletedList,state.newItemAction.selectedTab],
                        selectedTab : state.newItemAction.selectedTab + 1
                    }
                }),
                handleBar(state.newItemAction.selectedTab)
            )
    }

    const handleStepChange = () =>{
        handleBar(state.newItemAction.selectedTab+1)
        state.newItemAction.selectedStep === state.newItemAction.itemSteps.length -1 ?
            dispatch({
                type: caseActions.COMPLETESTEPS,
                newState : {
                    overlayComplete : true,
                    stepsCompletedList : [...state.newItemAction.stepsCompletedList,state.newItemAction.selectedStep]
                }
            })
            :
            dispatch({
                type : caseActions.HANDLESTEPCHANGE,
                newState : {
                    currentStep : state.newItemAction.selectesStep + 1,
                    currentStepTabs : state.newItemAction.itemSteps[state.newItemAction.selectedStep+1].tabs,
                    selectedTab : 0,
                    selectedStep: state.newItemAction.selectedStep +1,
                    stepsCompletedList : [...state.newItemAction.stepsCompletedList,state.newItemAction.selectedStep]
                }
            })
    }

    return (  
        <TouchableOpacity style={styles.container} onPress={()=>{handleNewItemTabChange()}}>
            <Text style={styles.title}>{state.newItemAction.overlayComplete? "CONTINUE" : "NEXT"}</Text>
            <SvgIcon iconName = "paginationNext" strokeColor="#3182CE"/>
        </TouchableOpacity>
    );
}
 
export default OverlayFooter;

const styles = StyleSheet.create({
    container:{
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    title:{
        fontSize:16,
        color:'#3182CE',
        fontWeight:'bold'
    }
})