export const caseActions = {
    SETPROGRESSWIDTH : 'SETPROGRESSWIDTH',
    UPDATEPROGRESSBARLIST : 'UPDATEPROGRESSBARLIST',
    SETREPORTDETAILS : 'SETREPORTDETAILS',
    SETNEWITEMACTION : 'SETNEWITEMACTION',
    TOGGLEREPORT : 'TOGGLEREPORT',
    NEWITEMTABCHANGE : 'NEWITEMTABCHANGE',
    COMPLETESTEPS : 'COMPLETESTEPS',
    HANDLESTEPCHANGE : 'HANDLESTEPCHANGE',
    NEWITEMPRESS : 'NEWITEMPRESS'
}

export const caseFilesReducer = (state, action) =>{
    const { type, newState } = action
    switch (type){
        case caseActions.SETPROGRESSWIDTH:
            return {
                ...state,
                progressContainerWidth : newState.progressContainerWidth
            }

        case caseActions.UPDATEPROGRESSBARLIST:
            return {
                ...state,
                progressList : newState.progressList
            }
    
        case caseActions.SETREPORTDETAILS:
            return {
                ...state,
                reportStatus : newState.reportStatus,
                reportInformation : newState.reportInformation,
                reportConsumablesList : newState.reportConsumablesList,
                reportConsumablesListHeaders : newState.reportConsumablesListHeaders
            }

        case caseActions.SETNEWITEMACTION:
            return {
                ...state,
                itemTitle : newState.itemTitle, 
                itemSteps : newState.itemSteps, 
                currentStepTabs : newState.currentStepTabs,
            }
        
        case caseActions.TOGGLEREPORT:
            return{
                ...state,
                reportStatus : newState.reportStatus
            }
    
        case caseActions.NEWITEMTABCHANGE:
            return {
                ...state,
                tabsCompletedList : newState.tabsCompletedList,
                selectedTab : newState.selectedTab
            }
        
        case caseActions.COMPLETESTEPS:
            return {
                ...state,
                overlayComplete : newState.overlayComplete
            }
        
        case caseActions.HANDLESTEPCHANGE:
            return {
                ...state,
                currentStep : newState.currentStep,
                currentStepTabs : newState.currentStepTabs,
                selectedTab : newState.selectedTab,
                selectedStep: newState.selectedStep
            }
        
        case caseActions.NEWITEMPRESS:
            return {
                ...state,
                selectedTab : newState.selectedTab,
                tabsCompletedList : newState.tabsCompletedList
            }
        
        default:
            return state
        
    }


}