import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ProgressViewIOS} from 'react-native';
import ProgressIcon from './ProgressIcon';
import ProgressBar from './ProgressBar';
import {transformToCamel} from '../../../hooks/useTextEditHook'
import {CaseFileContext} from '../../../contexts/CaseFileContext';
import {caseActions} from '../../../redux/reducers/caseFilesReducer'
import {TouchableOpacity} from 'react-native-gesture-handler';
import {handleNewItemProgressBar} from '../../../helpers/caseFilesHelpers';
import Complete from '../../../../assets/svg/stepComplete';


const ProgressContainer = ({steps, handleStepPress, selectedIndex, completedSteps}) => {

    const [state, dispatch] = useContext(CaseFileContext)
    const itemSteps = state.newItemAction.itemSteps
    const [progressWidth, setProgressWidth] = useState(0)

    const getProgressWidth = (width) => {
        setProgressWidth(width)
    }


    // getNumber = (step) =>{
    //     const stepObj = state.progressBar.progressList.filter(item => item.step === step)
    //     return stepObj[0].progress
    // }

    const getCompleteBar = (step) => {
        return completedSteps.includes(step)
    }

    const endBars = progressWidth / 6

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
            onLayout={(event) => getProgressWidth(event.nativeEvent.layout.width)}
        >
            {/* PROGRESS */}
            <View style={{
                flex: 1,
                marginTop: 20
            }}>
                <ProgressView progress={100} progressTint={"#0CB0E7"}/>
            </View>

            <>

                {
                    steps.map((step, index) => {
                        return (
                            <View key={index} style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={() => handleStepPress(step.name)}
                                >
                                    <Text
                                        style={{
                                            marginBottom: 10,
                                            color: selectedIndex === index ? '#3182CE' : '#A0AEC0'
                                        }}
                                    >
                                        {step.name}
                                    </Text>

                                    <ProgressIcon
                                        state={'inactive'}
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
                                </TouchableOpacity>

                                {
                                    // Intermediary Progress Bar
                                    (index < steps.length - 1) && // dont show bar after last step
                                    <View style={{
                                        width: 56,
                                        height: 4,
                                        marginTop: 20,
                                        alignSelf: "center"
                                    }}>
                                        <ProgressView progress={50} progressTint={'#0CB0E7'}/>
                                    </View>

                                }
                            </View>
                        )
                    })
                }

            </>

            {/* PROGRESS */}
            <View style={{
                flex: 1,
                marginTop: 20,
            }}>
                <ProgressView progress={0} progressTint={"#0CB0E7"}/>
            </View>

        </View>
    );
}

export default ProgressContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#EEF2F6'
    },
    iconsContainer: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    icon: {
        // flexDirection:'row',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'blue',
        position: 'absolute',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


const ProgressView = ({progress, progressTint = 'grey'}) => {
    return (
        // Progress Container
        <View style={progressStyles.container}>
            {/*  PROGRESS  */}
            <View style={{
                position: 'absolute',
                height: '100%',
                backgroundColor: progressTint,
                width: `${progress}%`
            }}/>
        </View>
    )
}

const progressStyles = StyleSheet.create({
    container: {
        width: "100%",
        position: 'relative',
        backgroundColor: "#E3E8EF",
        height: 4,
        borderRadius: 4,
        overflow: 'hidden'
    },
    progressBar: {}
})
