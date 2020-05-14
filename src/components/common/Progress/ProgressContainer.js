import React,{ useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet,ProgressViewIOS} from 'react-native';
import ProgressIcon from './ProgressIcon';
import ProgressBar from './ProgressBar';
import { transformToCamel } from '../../../hooks/useTextEditHook'
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import { caseActions } from '../../../redux/reducers/caseFilesReducer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {handleNewItemProgressBar} from '../../../helpers/caseFilesHelpers';
import Complete from '../../../../assets/svg/stepComplete';


const ProgressContainer = ({steps, handleStepPress, selectedIndex, completedSteps}) => {

    const [state, dispatch] = useContext(CaseFileContext)
    const itemSteps = state.newItemAction.itemSteps
    const [progressWidth, setProgressWidth] = useState(0)

    const getProgressWidth = (width) =>{
        setProgressWidth(width)
    }

     

    // getNumber = (step) =>{
    //     const stepObj = state.progressBar.progressList.filter(item => item.step === step)
    //     return stepObj[0].progress
    // }

    getCompleteBar = (step) =>{
        return completedSteps.includes(step)
    }

    const endBars = progressWidth/6

    // const handleItemStepPress = (index) =>{
    //     let newCompletedList = state.newItemAction.stepsCompletedList.slice(0,index)
    //     const updatedList = handleNewItemProgressBar(index,state.progressBar.progressList)
    //     //console.log("Overlay: ", state.newItemAction.overlayComplete)
    //     dispatch({
    //         type: caseActions.HANDLESTEPITEMPRESS,
    //         newState : {
    //             selectedStep : index,
    //             selectedTab: 0,
    //             stepsCompletedList : newCompletedList,
    //             currentStepTabs : state.newItemAction.itemSteps[index].tabs,
    //             overlayComplete: false
    //         }
    //     })
    //     dispatch({
    //         type : caseActions.UPDATEPROGRESSBARLIST,
    //         newState : {
    //             progressList : updatedList
    //         }
    //     })
    // }

    return (
        <View 
            style={styles.container}
            onLayout={(event)=>getProgressWidth(event.nativeEvent.layout.width)}
        >

            <View style={{width:endBars, marginRight:10}}>
                <ProgressBar progressNumber={1}/>
            </View>
            <View style={{flexDirection:'row'}}>

            {steps.map((step,index)=>{
                    return (
                        <TouchableOpacity 
                            style={styles.icon} 
                            key={index} 
                            onPress = {()=>handleStepPress(step.name)}
                        >
                            <Text
                                style={{paddingBottom:10,
                                color:selectedIndex === index ?'#3182CE': '#A0AEC0'}}>
                                {step.name}
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                <ProgressIcon
                                    icon={
                                        getCompleteBar(step.name) === true ?
                                            <Complete/>
                                            :
                                            selectedIndex === index ?
                                                step.selectedIcon
                                                :
                                                step.disabledIcon
                                    }
                                />
                                {/* {
                                     <View style={{width:endBars-20, marginRight:10, marginLeft:10}} >
                                        <ProgressBar progressNumber={step.progress}/>
                                    </View>
                                } */}
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
        // flex:1,
        paddingTop:15,
        paddingBottom:15,
        justifyContent:'flex-start',
        flexDirection:"row",
        backgroundColor:'#EEF2F6'
    },
    iconsContainer:{
        flex:1,
        backgroundColor:'red',
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'flex-start',
        width:'100%',
    },
    icon:{
       // flexDirection:'row',
        flexDirection:"column",
        alignItems:'center'
    }
})
