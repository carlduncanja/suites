import React,{ useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet,ProgressViewIOS} from 'react-native';
import ProgressIcon from './ProgressIcon';
import ProgressBar from './ProgressBar';
import { transformToCamel } from '../../../hooks/useTextEditHook'
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import { caseActions } from '../../../reducers/caseFilesReducer' 
import { TouchableOpacity } from 'react-native-gesture-handler';
import {handleNewItemProgressBar} from '../../../helpers/caseFilesHelpers';


const ProgressContainer = () => {

    const [state, dispatch] = useContext(CaseFileContext)
    const itemSteps = state.newItemAction.itemSteps
    const [progressWidth, setProgressWidth] = useState(0)
    const getProgressWidth = (width) =>{
        setProgressWidth(width)
    }

    getNumber = (step) =>{
        const stepObj = state.progressBar.progressList.filter(item => item.step === step)
        return stepObj[0].progress
    }

    getCompleteBar = (step) =>{
        return state.newItemAction.stepsCompletedList.includes(step)
    }

    const endBars = progressWidth/6

    const handleItemStepPress = (index) =>{
        let newCompletedList = state.newItemAction.stepsCompletedList.slice(0,index)
        const updatedList = handleNewItemProgressBar(index,state.progressBar.progressList)
        //console.log("Overlay: ", state.newItemAction.overlayComplete)
        dispatch({
            type: caseActions.HANDLESTEPITEMPRESS,
            newState : {
                selectedStep : index,
                selectedTab: 0,
                stepsCompletedList : newCompletedList,
                currentStepTabs : state.newItemAction.itemSteps[index].tabs,
                overlayComplete: false
            }
        })
        dispatch({
            type : caseActions.UPDATEPROGRESSBARLIST,
            newState : {
                progressList : updatedList
            }
        })
    }

    return (  
        <View style={styles.container}>    
            <View style={[styles.iconsContainer]} onLayout={(event)=>getProgressWidth(event.nativeEvent.layout.width)}>   
                <View style={{width:endBars,top:"5%", marginRight:10}}>
                    <ProgressBar progressNumber={1}/>
                </View> 
                {itemSteps.map((step,index)=>{
                    return (
                        <TouchableOpacity style={styles.icon} key={index} onPress = {()=>handleItemStepPress(index)}>
                            <Text 
                                style={{paddingBottom:10,
                                color:state.newItemAction.selectedStep === index ?'#3182CE': '#A0AEC0'}}>
                                {step.stepName}
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                {/* {console.log("CompletedList: ", state.newItemAction.stepsCompletedList)} */}
                                <ProgressIcon 
                                    icon={
                                        getCompleteBar(index) === true ?
                                            "stepComplete"
                                            :
                                            state.newItemAction.selectedStep === index ?
                                                `${transformToCamel(step.stepName)}SelectedNew`
                                                :
                                                `${transformToCamel(step.stepName)}DisabledNew`
                                    }
                                />
                                {
                                     <View style={{width:endBars-20, marginRight:10, marginLeft:10}} >
                                        <ProgressBar progressNumber={getNumber(index)}/>
                                    </View> 
                                }
                            </View>

                        </TouchableOpacity>
                    )
                })}
            </View>            
        </View>
    );
}
 
export default ProgressContainer;

const styles = StyleSheet.create({
    container:{
        paddingTop:15,
        paddingBottom:15,
        justifyContent:'center'
    },
    iconsContainer:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'flex-start',
        width:'100%',
    },
    icon:{
       // flexDirection:'row',
        flexDirection:"column",
    }
})