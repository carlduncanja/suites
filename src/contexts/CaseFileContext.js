import React, { useState, createContext, useContext, useReducer, useEffect } from 'react';
import { caseFilesReducer, caseActions } from '../redux/reducers/caseFilesReducer';
import { getList, getReportList } from '../hooks/useListHook';


export const CaseFileContext = createContext()

const bmiScale = require('../../assets/db.json').caseFiles.bmiScale
const progressBar = {
    progressList : []
}

const report = {
    reportStatus : false,
    reportInformation : [],
    reportConsumablesList : [],
    reportConsumablesListHeaders : []
}
const newItemAction  = {
    itemTitle : "", //title of container
    itemSteps : [], // steps
    selectedStep : 0, //index of current step
    selectedTab : 0, //index of selected tab of current step,
    currentStepTabs : [], //tabs of current step
    overlayComplete : false, //state of item complete
    tabsCompletedList : [],
    stepsCompletedList : []
}
const state = {bmiScale, progressBar, report, newItemAction}

export const CaseFileContextProvider = (props) => {
    return (
        <CaseFileContext.Provider value={useReducer(caseFilesReducer,state)}>
            {props.children}
        </CaseFileContext.Provider>
    );
}



