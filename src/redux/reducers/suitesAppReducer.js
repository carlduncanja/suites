export const appActions = {
    GOTOPREVIOUSPAGE : 'GOTOPREVIOUSPAGE',
    GOTONEXTPAGE : 'GOTONEXTPAGE',
    SETTOTALPAGES : 'SETTOTALPAGES',
    SETLISTDATA : 'SETLISTDATA',
    SETFLOATINGACTIONS : 'SETFLOATINGACTIONS',
    TOGGLEACTIONBUTTON : 'TOGGLEACTIONBUTTON',
    TOGGLEOPENACTION : 'TOGGLEOPENACTION',
    SETOVERLAYMENU : 'SETOVERLAYMENU',
    OVERLAYTABCHANGE : 'OVERLAYTABCHANGE',
    OVERLAYMENUCHANGE : 'OVERLAYMENUCHANGE',
    SETSELECTEDLISTITEM : 'SETSELECTEDLISTITEM',
    CLOSESLIDEOVERLAY : 'CLOSESLIDEOVERLAY',
    SETSLIDEOVERLAY : 'SETSLIDEOVERLAY',
    OVERLAYTABCHANGEINFO : 'OVERLAYTABCHANGEINFO',
    SETSLIDEOVERLAYLIST : 'SETSLIDEOVERLAYLIST',
    TOGGLECHECKBOX : 'TOGGLECHECKBOX',
    SETPAGEMEASURES : 'SETPAGEMEASURES',
    SETSLIDEVALUE : 'SETSLIDEVALUE',
    SETOVERLAYEDITSTATE : 'SETOVERLAYEDITSTATE',
}

export const suitesAppReducer = (state, action) => {
    const { type, newState } = action
    switch (type){
        case appActions.GOTOPREVIOUSPAGE:
            return state.paginatorValues.currentPage !== 1 ?
            {
                ...state,
                paginatorValues:{
                    ...state.paginatorValues,
                    currentPage: state.paginatorValues.currentPage - 1,
                    sliceArrayStart: state.paginatorValues.sliceArrayStart - state.paginatorValues.recordsPerPage,
                    sliceArrayEnd: state.paginatorValues.sliceArrayEnd - state.paginatorValues.recordsPerPage
                }
            }
            :
            {...state}

        case appActions.GOTONEXTPAGE:
            return state.paginatorValues.currentPage !== state.paginatorValues.totalPages ? {
                ...state,
                paginatorValues:{
                    ...state.paginatorValues,
                    currentPage: state.paginatorValues.currentPage + 1,
                    sliceArrayStart: state.paginatorValues.sliceArrayStart + state.paginatorValues.recordsPerPage,
                    sliceArrayEnd: state.paginatorValues.sliceArrayEnd + state.paginatorValues.recordsPerPage
                }
            }:
            {
                ...state
            }
        
        case appActions.SETTOTALPAGES:
            return {
                ...state,
                paginatorValues:{
                    ...state.paginatorValues,
                    totalPages: newState.totalPages
                }
            }
        
        case appActions.SETLISTDATA:
            return {
                ...state,
                list :{
                    ...state.list,
                    listData: newState.listData,
                    listHeaders : newState.listHeaders,
                    selectedSourceData : newState.selectedSourceData
                }  
            }

        case appActions.SETFLOATINGACTIONS:
            return {
                ...state, 
                floatingActions:{
                    ...state.floatingActions,
                    floatingActionsObject : {
                        actionTitle : newState.actionTitle,
                        actions : newState.actions
                    }  
                } 
            }

        case appActions.TOGGLEACTIONBUTTON:
            return {
                ...state,
                floatingActions:{
                    ...state.floatingActions,
                    actionButtonState : newState
                }
            }
        
        case appActions.TOGGLEOPENACTION:
            return {
                ...state,
                floatingActions:{
                    ...state.floatingActions,
                    openAction : newState.openAction
                }
            }
        
        case appActions.SETOVERLAYMENU:
            return {
                ...state,
                overlayMenu:{
                    ...state.overlayMenu,
                    menu : newState.menu,
                    selectedMenuItemTabs : newState.selectedMenuItemTabs,
                }  
            }

        case appActions.OVERLAYTABCHANGE:
            return {
                ...state,
                overlayMenu:{
                    ...state.overlayMenu,
                    selectedMenuItemCurrentTab : newState.selectedMenuItemCurrentTab
                } 
            }
        
        case appActions.OVERLAYMENUCHANGE:
            return {
                ...state,
                overlayMenu:{
                    ...state.overlayMenu,
                    selectedMenuItem: newState.selectedMenuItem,
                    selectedMenuItemTabs: newState.selectedMenuItemTabs,
                    selectedMenuItemCurrentTab: newState.selectedMenuItemCurrentTab
                }
            }
        
        case appActions.OVERLAYTABCHANGEINFO:
            return {
                ...state,
                slideOverlay:{
                    ...state.slideOverlay,
                    slideOverlayTabInfo : newState.slideOverlayTabInfo
                }
            }

        case appActions.SETSELECTEDLISTITEM:
            return{
                ...state,
                selectedListItem : {
                    ...state.selectedListItem,
                    selectedListItemId : newState.selecteselectedListItemId,
                    selectedListObject : newState.selectedListObject
                }
            }

        case appActions.CLOSESLIDEOVERLAY:
            return {
                ...state,
                slideOverlay :{
                    ...state.slideOverlay,
                    slideOverlayStatus : newState.slideOverlayStatus
                }
            }
        
        case appActions.SETSLIDEOVERLAY:
            return {
                ...state,
                slideOverlay:{
                    ...state.slideOverlay,
                    slideOverlayHeader : newState.slideOverlayHeader,
                    slideOverlayStatus : newState.slideOverlayStatus,
                    slideOverlayTabInfo : newState.slideOverlayTabInfo
                }
            }
        
        case appActions.SETSLIDEOVERLAYLIST:
            return {
                ...state, 
                slideOverlay:{
                    ...state.slideOverlay,
                    slideOverlayList : newState.slideOverlayList,
                    slideOverlayListHeaders : newState.slideOverlayListHeaders
                }
            }
        
        case appActions.SETOVERLAYEDITSTATE : 
            return {
                ...state, 
                slideOverlay:{
                    ...state.slideOverlay,
                    slideOverlayButtonEdit : newState.slideOverlayButtonEdit,
                }
            }
        
        case appActions.TOGGLECHECKBOX:
            return {
                ...state,
                list : {
                    ...state.list,
                    checkedItemStatus : newState.checkedItemStatus,
                    checkedItemsList : newState.checkedItemsList
                }  
            }
        
        case appActions.SETPAGEMEASURES:
            return {
                ...state,
                pageMeasure:newState
            }
        
        case appActions.SETPAGEMEASURES:
            return {
                ...state,
                slideTopValue:newState
            }
        
        default:
            return state
    }
}