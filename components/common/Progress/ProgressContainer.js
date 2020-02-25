import React,{ useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet,ProgressViewIOS} from 'react-native';
import ProgressIcon from './ProgressIcon';
import ProgressBar from './ProgressBar';
import { SuitesContext } from '../../../contexts/SuitesContext';

const ProgressContainer = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods
    
    getNumber = (step) =>{
        const stepObj = suitesState.progressList.filter(item => item.step === step)
        return stepObj[0].progress
    }

    const endBars = suitesState.progressContainerWidth/6
    return (  
        <View style={styles.container}>    
                <View style={[styles.iconsContainer]} onLayout={(event)=>suitesMethod.getProgressWidth(event.nativeEvent.layout.width)}>   
                    <View style={{width:endBars,top:"5%", marginRight:10}}>
                        <ProgressBar progressNumber={1}/>
                    </View> 
            
                    {suitesState.itemSteps && suitesState.itemSteps.map((step,index)=>{
                        return(
                            <View style={styles.icon} key={index}>
                                <Text 
                                    style={{paddingBottom:10,
                                    color:suitesState.currentStep === step ?'#3182CE': '#A0AEC0'}}>
                                    {step}
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <ProgressIcon 
                                        icon={
                                            suitesState.currentStep === step ?
                                                `${suitesMethod.transformToCamel(step)}SelectedNew`
                                                :
                                                getNumber(step) >= 1 ?
                                                    "stepComplete"
                                                :
                                                `${suitesMethod.transformToCamel(step)}DisabledNew`
                                        }
                                    />
                                    {
                                        (index === 0 || index === 1) &&
                                            <View style={{width:endBars-20, marginRight:10, marginLeft:10}} >
                                                <ProgressBar 
                                                    progressNumber={getNumber(step)}/>
                                            </View> 
                                    }                                    
                                </View>       
                            </View>
                                       
                         
                        )
                    })}
              
                    <View style={{width:endBars,top:'5%'}}>
                        <ProgressBar progressNumber={1}/>
                    </View> 
            </View>            
        </View>
    );
}
 
export default ProgressContainer;

const styles = StyleSheet.create({
    container:{
        paddingTop:15,
        paddingBottom:15,
    },
    progressBar:{
        //position:'absolute',
        //top:'30%',
        //width:'100%',
        //zIndex:-1
    },
    text:{

    },
    iconsContainer:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'flex-start',
        width:'100%',
    },
    icon:{
        flexDirection:'row',
        flexDirection:"column",
        //alignItems:'center',
    }
})