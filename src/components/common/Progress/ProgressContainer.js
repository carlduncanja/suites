import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressIcon from './ProgressIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Complete from '../../../../assets/svg/stepComplete';


const ProgressContainer = ({steps, handleStepPress, selectedIndex, completedSteps, currentProgress}) => {

    const getCompleteBar = (step) => {
        return completedSteps.includes(step)
    }

    const getIconState = (index) => {
        // if the index is the current index
        // then the return `currentProgress`
        if (index === selectedIndex) return 'active';
        // if the selectedIndex is greater then assume the progress in 100
        else if (index < selectedIndex) return 'completed';
        // assume we have no progress.
        else return 'inactive';
    }

    const getProgressForIndex = (index) => {
        // if the index is the current index
        // then the return `currentProgress`
        if (index === selectedIndex) return currentProgress;
        // if the selectedIndex is greater then assume the progress in 100
        else if (index < selectedIndex) return 100;
        // assume we have no progress.
        else return 0;
    };

    return (
        <View
            style={styles.container}
        >
            {/* PROGRESS BAR */}
            <View style={{
                flex: 1,
                marginTop: 24
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
                                            alignSelf: "center",
                                            color: selectedIndex === index ? '#3182CE' : '#A0AEC0'
                                        }}
                                    >
                                        {step.name}
                                    </Text>

                                    <ProgressIcon
                                        state={getIconState(index)}
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
                                    //  INTERMEDIARY PROGRESS BAR
                                    (index < steps.length - 1) && // dont show bar after last step
                                    <View style={{
                                        width: 56,
                                        height: 4,
                                        marginTop: 24,
                                        alignSelf: "center"
                                    }}>
                                        <ProgressView progress={getProgressForIndex(index)} progressTint={'#0CB0E7'}/>
                                    </View>
                                }

                            </View>
                        )
                    })
                }

            </>

            {/* PROGRESS BAR */}
            <View style={{
                flex: 1,
                marginTop: 24
            }}>
                <ProgressView progress={getProgressForIndex(steps.length-1)} progressTint={"#0CB0E7"}/>
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
