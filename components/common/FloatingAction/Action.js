import React,{Component, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from '../../../assets/SvgIcon'
import { SuitesContext } from '../../../contexts/SuitesContext';
import { withModal } from 'react-native-modalfy'
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import { caseActions } from '../../../reducers/caseFilesReducer'
import { appActions } from '../../../reducers/suitesAppReducer'

const Action = (props) => {
    const [appState, dispatchApp] = useContext(SuitesContext)
    const [state, dispatch ] = useContext(CaseFileContext)

    const openModal = () =>{
        const {modal, modalToOpen} = props
        modal.openModal(modalToOpen)
    }
    getNewItemOverlaySteps = ()=>{
        const stepsArray = require('../../../assets/db.json').createItem.filter(item => item.page === "caseFiles")
        const steps = stepsArray[0].steps
        let tabObjects = []
        let stepsProgress = []
        stepsArray.length > 0 && 
        (  
            steps[0].tabs.map(tab=> tabObjects.push(tab)),
            steps.forEach((step, index)=>stepsProgress.push({"step":index,"progress":0})),
            dispatch({
                type: caseActions.SETNEWITEMACTION,
                newState : {
                    itemTitle : stepsArray[0].title, 
                    itemSteps : stepsArray[0].steps, 
                    currentStepTabs : steps[0].tabs,
                }
            }),
            dispatch({
                type: caseActions.UPDATEPROGRESSBARLIST,
                newState : {
                    progressList : stepsProgress
                }
            })
        )
    }

    return ( 
        props.action.disabled ?
            <View style={styles.container}>
                <SvgIcon iconName={props.action.action} strokeColor="#A0AEC0"/>
                <Text style={[styles.text, styles.disabledText]}>{props.action.actionName}</Text>
            </View>
            :
            <TouchableOpacity 
                style={styles.container} 
                onPress={()=>{
                    openModal()
                    // this.openModal(props);
                    getNewItemOverlaySteps();
                    dispatchApp({
                        type: appActions.TOGGLEOPENACTION,
                        newState : true
                    })
                }}
            >
                <SvgIcon iconName={props.action.action} strokeColor="#2F855A"/>
                <Text style={styles.text}>{props.action.actionName}</Text>
            </TouchableOpacity>

    );
}
 
export default withModal(Action);

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    iconContainer:{

    },
    text:{
        marginLeft:15,
        fontSize:16
    },
    disabledText:{
        color:"#A0AEC0",
    }
})