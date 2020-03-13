import React, { useState, createContext, useContext, useReducer, useEffect } from 'react';
import { caseFilesReducer, caseActions } from '../reducers/caseFilesReducer';
import { getList, getReportList } from '../hooks/useListHook';
import { SuitesContext } from './SuitesContext';

export const CaseFileContext = createContext()
export const CaseFileContextProvider = (props) => {

    const currentNavPage = useContext(SuitesContext).state.currentNavPage
    const [bmiScale, setBmi] = useState(require('../assets/db.json').caseFiles.bmiScale)
    const [progressBar, dispatchProgressBar] = useReducer(caseFilesReducer,{
        progressContainerWidth : 0,
        progressList : []
    })
    const [report, dispatchReport] = useReducer(caseFilesReducer,{
        reportStatus : false,
        reportInformation : [],
        reportConsumablesList : [],
        reportConsumablesListHeaders : []
    })
    const [newItemAction, dispatchNewItem] = useReducer(caseFilesReducer,{
        itemTitle : "", //title of container 
        itemSteps : [], // steps
        selectedStep : 0, //index of current step
        selectedTab : 0, //index of selected tab of current step,
        currentStepTabs : [], //tabs of current step
        overlayComplete : false, //state of item complete
        tabsCompletedList : []
    })

    getNewItemOverlaySteps = ()=>{
        const stepsArray = require('../assets/db.json').createItem.filter(item => item.page === "caseFiles")
        const steps = stepsArray[0].steps
        let tabObjects = []
        let stepsProgress = []
        stepsArray.length > 0 && 
        (  
            steps[0].tabs.map(tab=> tabObjects.push(tab)),
            steps.forEach((step, index)=>stepsProgress.push({"step":index,"progress":0})),
            dispatchNewItem({
                type: caseActions.SETNEWITEMACTION,
                newState : {
                    itemTitle : stepsArray[0].title, 
                    itemSteps : stepsArray[0].steps, 
                    currentStepTabs : steps[0].tabs,
                }
            }),
            dispatchProgressBar({
                type: caseActions.UPDATEPROGRESSBARLIST,
                newState : {
                    progressList : stepsProgress
                }
            })
        )
    }
    
    getProgressWidth = (width) =>{
        dispatchProgressBar({
            type: caseActions.SETPROGRESSWIDTH,
            newState : {
                progressContainerWidth : width
            }
        })
    }

    openReportAction=(id)=>{
        const selectedItem = slideOverlay.slideOverlayTabInfo.filter(info => id === info.list.id)
        const preview=selectedItem[0].preview
        const consumables = preview.quotationDetails.consumablesTable
        dispatchReport({
            type: caseActions.SETREPORTDETAILS,
            newState:{
                reportStatus : true,
                reportInformation : preview,
                reportConsumablesList : getList(consumables.data,consumables.headers),
                reportConsumablesListHeaders : consumables.headers
            }
        })
    }

    closePreview = ()=>{
        dispatchReport({
            type : caseActions.TOGGLEREPORT,
            newState:{
                reportStatus : false
            }
        })
    }

    handleProgressBar = (tabIndex) =>{
        let progress = 1/newItemAction.currentStepTabs.length
        const objIndex = progressBar.progressList.findIndex(obj => obj.step === newItemAction.selectedStep)
        const updatedObj = {...progressBar.progressList[objIndex], "progress":(tabIndex+1) * progress}
        const updatedList = [...progressBar.progressList.slice(0,objIndex),updatedObj,...progressBar.progressList.slice(objIndex+1)]
        dispatchProgressBar({
            type : caseActions.UPDATEPROGRESSBARLIST,
            newState : {progressList:updatedList}
        })
    }

    handleNewItemTabChange =()=>{    
        newItemAction.selectedTab === newItemAction.currentStepTabs.length-1 ? 
            handleStepChange() 
            :
            (
                dispatchNewItem({
                    type : caseActions.NEWITEMTABCHANGE,
                    newState : {
                        tabsCompletedList : [...newItemAction.tabsCompletedList,newItemAction.selectedTab],
                        selectedTab : newItemAction.selectedTab + 1
                    }
                }),
                handleProgressBar(newItemAction.selectedTab)
            )
    }

    handleStepChange = () =>{
        handleProgressBar(newItemAction.selectedTab+1)
        newItemAction.selectedStep === newItemAction.itemSteps.length -1 ?
            dispatchNewItem({
                type: caseActions.COMPLETESTEPS,
                newState : {
                    overlayComplete : true
                }
            })
            :
            dispatchNewItem({
                type : caseActions.HANDLESTEPCHANGE,
                newState : {
                    currentStep : newItemAction.selectesStep + 1,
                    currentStepTabs : newItemAction.itemSteps[newItemAction.selectedStep+1].tabs,
                    selectedTab : 0,
                    selectedStep: newItemAction.selectedStep +1
                }
            })
    }

    handleNewItemPress = (tabIndex) =>{
        newItemAction.tabsCompletedList.includes(tabIndex) && (
            dispatchNewItem({
                type : caseActions.NEWITEMPRESS,
                newState : {
                    selectedTab : tabIndex,
                    tabsCompletedList : newItemAction.tabsCompletedList.slice(0,tabIndex)
                }
            }),
            handleProgressBar(tabIndex)
        )
    }
    
    const state = {bmiScale, progressBar, report, newItemAction}
    const methods = {
        getProgressWidth, 
        openReportAction, 
        closePreview,
        handleNewItemPress,
        getNewItemOverlaySteps,
        handleNewItemTabChange
    }

    return (  
        <CaseFileContext.Provider value={{state, methods}}>
            {props.children}
        </CaseFileContext.Provider>
    );
}
 


