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
}

export const suitesAppReducer = (state, action) => {
    const { type, newState } = action
    switch (type){
        case appActions.GOTOPREVIOUSPAGE:
            return state.currentPage !== 1 ?
            {
                ...state,
                currentPage: state.currentPage - 1,
                sliceArrayStart: state.sliceArrayStart - state.recordsPerPage,
                sliceArrayEnd: state.sliceArrayEnd - state.recordsPerPage
            }
            :
            {...state}

        case appActions.GOTONEXTPAGE:
            return state.currentPage !== state.totalPages && {
                ...state,
                currentPage: state.currentPage + 1,
                sliceArrayStart: state.sliceArrayStart + state.recordsPerPage,
                sliceArrayEnd: state.sliceArrayEnd + state.recordsPerPage
            }
        
        case appActions.SETTOTALPAGES:
            return {
                ...state,
                totalPages: newState.totalPages
            }
        
        case appActions.SETLISTDATA:
            return {
                ...state,
                listData: newState.listData,
                listHeaders : newState.listHeaders
            }

        case appActions.SETFLOATINGACTIONS:
            return {
                ...state, 
                floatingActionsObject : {
                    actionTitle : newState.actionTitle,
                    actions : newState.actions
                }  
            }

        case appActions.TOGGLEACTIONBUTTON:
            return {
                ...state,
                actionButtonState : newState.actionButtonState
            }

        case appActions.TOGGLEOPENACTION:
            return {
                ...state,
                openAction : newState.openAction
            }
        
        case appActions.SETOVERLAYMENU:
            return {
                ...state,
                menu : newState.menu,
                selectedMenuItemTabs : newState.selectedMenuItemTabs,
            }

        case appActions.OVERLAYTABCHANGE:
            return {
                ...state,
                selectedMenuItemCurrentTab : newState.selectedMenuItemCurrentTab
            }
        
        case appActions.OVERLAYMENUCHANGE:
            return {
                ...state,
                selectedMenuItem: newState.selectedMenuItem,
                selectedMenuItemTabs: newState.selectedMenuItemTabs,
                selectedMenuItemCurrentTab: newState.selectedMenuItemCurrentTab
            }
        
        case appActions.OVERLAYTABCHANGEINFO:
            return {
                ...state,
                slideOverlayTabInfo : newState.slideOverlayTabInfo
            }

        case appActions.SETSELECTEDLISTITEM:
            return{
                ...state,
                selectedListItemId : newState.selecteselectedListItemId,
                selectedListObject : newState.selectedListObject
            }

        case appActions.CLOSESLIDEOVERLAY:
            return {
                ...state,
                slideOverlayStatus : newState.slideOverlayStatus
            }
        
        case appActions.SETSLIDEOVERLAY:
            return {
                ...state,
                slideOverlayHeader : newState.slideOverlayHeader,
                slideOverlayStatus : newState.slideOverlayStatus,
                slideOverlayTabInfo : newState.slideOverlayTabInfo
            }
        
        case appActions.SETSLIDEOVERLAYLIST:
            return {
                ...state, 
                slideOverlayList : newState.slideOverlayList,
                slideOverlayListHeaders : newState.slideOverlayListHeaders
            }
        
        case appActions.TOGGLECHECKBOX:
            return {
                ...state,
                checkedItemStatus : newState.checkedItemStatus,
                checkedItemsList : newState.checkedItemsList
            }
        default:
            return state
    }
}