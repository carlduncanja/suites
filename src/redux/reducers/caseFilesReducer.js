export const caseActions = {
    SETPROGRESSWIDTH : 'SETPROGRESSWIDTH',
    UPDATEPROGRESSBARLIST : 'UPDATEPROGRESSBARLIST',
    SETREPORTDETAILS : 'SETREPORTDETAILS',
    SETNEWITEMACTION : 'SETNEWITEMACTION',
    TOGGLEREPORT : 'TOGGLEREPORT',
    NEWITEMTABCHANGE : 'NEWITEMTABCHANGE',
    COMPLETESTEPS : 'COMPLETESTEPS',
    HANDLESTEPCHANGE : 'HANDLESTEPCHANGE',
    NEWITEMPRESS : 'NEWITEMPRESS',
    HANDLESTEPITEMPRESS : 'HANDLESTEPITEMPRESS'
};

export const caseFilesReducer = (state, action) =>{
    const { type, newState } = action
    switch (type){
        // case caseActions.SETPROGRESSWIDTH:
        //     let progressBar = {
        //         ...state.progressBar,
        //         progressContainerWidth : newState.progressContainerWidth
        //     }
        //     return {...state,progressBar}

        case caseActions.UPDATEPROGRESSBARLIST:
            return {
                ...state,
                progressBar:{
                    ...state.progressBar,
                    progressList : newState.progressList
                }
            }

        case caseActions.SETREPORTDETAILS:
            return {
                ...state,
                report:{
                    reportStatus : newState.reportStatus,
                    reportId : newState.reportId,
                    billingDetails : newState.billingDetails,
                    reportList : newState.reportList,
                    reportTable : newState.reportTable,
                    billingSummary :newState.billingSummary
                }
            }

        case caseActions.SETNEWITEMACTION:
            return {
                ...state,
                newItemAction:{
                    ...state.newItemAction,
                    itemTitle : newState.itemTitle,
                    itemSteps : newState.itemSteps,
                    currentStepTabs : newState.currentStepTabs,
                }
            }

        case caseActions.TOGGLEREPORT:
            return {
                ...state,
                report : {
                    ...state.report,
                    reportStatus : newState.reportStatus
                }
            }

        case caseActions.NEWITEMTABCHANGE:
            return {
                ...state,
                newItemAction:{
                    ...state.newItemAction,
                    tabsCompletedList : newState.tabsCompletedList,
                    selectedTab : newState.selectedTab
                }
            }

        case caseActions.COMPLETESTEPS:
            return {
                ...state,
                newItemAction:{
                    ...state.newItemAction,
                    overlayComplete : newState.overlayComplete,
                    stepsCompletedList : newState.stepsCompletedList
                }
            }

        case caseActions.HANDLESTEPCHANGE:
            return {
                ...state,
                newItemAction:{
                    ...state.newItemAction,
                    currentStep : newState.currentStep,
                    currentStepTabs : newState.currentStepTabs,
                    selectedTab : newState.selectedTab,
                    selectedStep: newState.selectedStep,
                    stepsCompletedList : newState.stepsCompletedList
                }
            }

        case caseActions.NEWITEMPRESS:
            return {
                ...state,
                newItemAction:{
                    ...state.newItemAction,
                    selectedTab : newState.selectedTab,
                    tabsCompletedList : newState.tabsCompletedList
                }
            }

        case caseActions.HANDLESTEPITEMPRESS:
            return {
                ...state,
                newItemAction:{
                    ...state.newItemAction,
                    stepsCompletedList : newState.stepsCompletedList,
                    selectedStep : newState.selectedStep,
                    selectedTab : newState.selectedTab,
                    currentStepTabs : newState.currentStepTabs,
                    overlayComplete : newState.overlayComplete
                }
            }

        default:
            return state

    }


}
