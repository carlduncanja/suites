import React, { useContext } from 'react';
import { caseActions } from '../reducers/caseFilesReducer'
import { CaseFileContext } from '../contexts/CaseFileContext';


export const handleProgressBar = (tabIndex, progressList, selectedStep, tabsLength ) =>{
    let progress = 1/tabsLength
    const objIndex = progressList.findIndex(obj => obj.step === selectedStep)
    const updatedObj = {...progressList[objIndex], "progress":(tabIndex+1) * progress}
    const updatedList = [...progressList.slice(0,objIndex),updatedObj,...progressList.slice(objIndex+1)]
    return updatedList
}

export const handleNewItemProgressBar = (tabIndex, progressList) =>{
    let newProgress = []
    const objIndex = progressList.findIndex(obj => obj.step === tabIndex)
    for (let i = objIndex; i < progressList.length; i++){
        let newObject = {...progressList[i], "progress":0}
        newProgress.push(newObject)
    }
    const updatedList = [...progressList.slice(0,objIndex),...newProgress]
    return updatedList
}