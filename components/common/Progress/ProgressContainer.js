import React,{ useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet,ProgressViewIOS} from 'react-native';
import ProgressIcon from './ProgressIcon';
import ProgressBar from './ProgressBar';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { transformToCamel } from '../../../hooks/useTextEditHook'
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const ProgressContainer = () => {
    const caseState = useContext(CaseFileContext).state
    const caseMethods = useContext(CaseFileContext).methods
    const itemSteps = caseState.newItemAction.itemSteps

    getNumber = (step) =>{
        const stepObj = caseState.progressBar.progressList.filter(item => item.step === step)
        return stepObj[0].progress
    }

    const endBars = caseState.progressBar.progressContainerWidth/6
    return (  
        <View style={styles.container}>    
            <View style={[styles.iconsContainer]} onLayout={(event)=>caseMethods.getProgressWidth(event.nativeEvent.layout.width)}>   
                <View style={{width:endBars,top:"5%", marginRight:10}}>
                    <ProgressBar progressNumber={1}/>
                </View> 
                {itemSteps.map((step,index)=>{
                    return (
                        <View style={styles.icon} key={index}>
                            <Text 
                                style={{paddingBottom:10,
                                color:caseState.newItemAction.selectedStep === index ?'#3182CE': '#A0AEC0'}}>
                                {step.stepName}
                            </Text>
                            <View style={{flexDirection:'row'}}>
                                <ProgressIcon 
                                    icon={
                                        getNumber(index) >= 1 ?
                                            "stepComplete"
                                            :
                                            caseState.newItemAction.selectedStep === index ?
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

                        </View>
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