import React, {createContext, useReducer} from 'react';
import { suitesAppReducer } from '../reducers/suitesAppReducer';

export const SuitesContext = createContext()

const pageMeasure = {}
const searchPlaceholder = "Search by any heading or entry below"
const slideTopValue = 0
        //Take out for Nav
const currentNavPage = "caseFiles";
const pageTitle  = 'Case Files'
const list = {
    listData: [],
    listHeaders: [],
    checkedItemStatus : false,
    checkedItemsList : [],
    selectedSourceData : []
}
const overlayMenu = {
    menu : [],
    selectedMenuItem : 0, 
    selectedMenuItemTabs : [], 
    selectedMenuItemCurrentTab : 0 
}
const slideOverlay = {
    slideOverlayStatus: false,
    slideOverlayHeader : {},
    slideOverlayTabInfo : {},
    slideOverlayList : [],
    slideOverlayListHeaders : []
}
const selectedListItem = {
    selectedListItemId : "",
    selectedListObject : {},
}
const floatingActions = {
    floatingActionsObject : {
        actionTitle:"",
        actions:[]
    },
    actionButtonState : false,
    openAction : false
}
const paginatorValues = {
    currentPage:1,
    sliceArrayStart:0,
    sliceArrayEnd:10,
    totalPages: 0,
    recordsPerPage:10
}

const editMode = {
    status: false,
    currentEditTab:0,
}

const state = {
    pageTitle, 
    paginatorValues, 
    list,
    floatingActions,
    searchPlaceholder, 
    slideOverlay,
    overlayMenu,
    slideTopValue,
    pageMeasure,
    currentNavPage,
    selectedListItem,
    editMode
}

export const SuitesContextProvider = (props) => {
    return (  
        <SuitesContext.Provider value={useReducer(suitesAppReducer,state)}>
            {props.children}
        </SuitesContext.Provider>
    );
}
 