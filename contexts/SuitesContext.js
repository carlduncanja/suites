import React, { useState, createContext, useEffect, useReducer, useRef} from 'react';
import { getList, getReportList } from '../hooks/useListHook';
import { transformToCamel, transformToSentence } from '../hooks/useTextEditHook';
import { suitesAppReducer, appActions } from '../reducers/suitesAppReducer';

export const SuitesContext = createContext()

export const SuitesContextProvider = (props) => {
    //Suites
        const [selectedSourceData, setSelectedSourceData] = useState([])
        const [pageMeasure, setPageMeasure] = useState({})
        const [searchPlaceholder, setSearchPlaceholder] = useState("Search by any heading or entry below")
        const [slideTopValue, setSlideTopValue] = useState(0);
        //Take out for Nav
        const [currentNavPage, setCurrentNavPage] = useState("caseFiles");
        const [pageTitle, setPageTitle] = useState('Case Files')
    
        //List - move to list component
        const [list, dispatchListReducer] = useReducer(suitesAppReducer, {
            listData: [],
            listHeaders: [],
            checkedItemStatus : false,
            checkedItemsList : []
        })

        //SLIDEOverlay

        const [overlayMenu, dispatchOverlayMenu] = useReducer(suitesAppReducer,{
            menu : [],
            selectedMenuItem : 0, 
            selectedMenuItemTabs : [], 
            selectedMenuItemCurrentTab : 0 
        })

        const [slideOverlay, dispatchSlideOverlay] = useReducer(suitesAppReducer,{
            slideOverlayStatus: false,
            slideOverlayHeader : {},
            slideOverlayTabInfo : {},
            slideOverlayList : [],
            slideOverlayListHeaders : []
        }) 

        const [selectedListItem, dispatchSelectedListItem] = useReducer(suitesAppReducer,{
            selectedListItemId : "",
            selectedListObject : {},
        })

        //FloatingActions
        const [floatingActions, dispatchFloatingActions] = useReducer(suitesAppReducer, {
            floatingActionsObject : {
                actionTitle:"",
                actions:[]
            },
            actionButtonState : false,
            openAction : false
        })

        const [paginatorValues, dispatchPaginator] = useReducer(suitesAppReducer,{
            currentPage:1,
            sliceArrayStart:0,
            sliceArrayEnd:10,
            totalPages: 0,
            recordsPerPage:10
        })
        
    
    //Suites
    useEffect(()=>{
        dispatchPaginator({
            type:appActions.SETTOTALPAGES, 
            newState: { totalPages : Math.ceil(list.listData.length/paginatorValues.recordsPerPage) }
        })
    },[list.listData])

    useEffect(()=>{
        let data 
        let headers = []
        let selected = []
        if (currentNavPage === 'caseFiles') {
            data = require('../assets/db.json').caseFiles.caseFilesInformation.data
            headers = require('../assets/db.json').caseFiles.caseFilesInformation.headers
            selected = require('../assets/db.json').caseFiles.caseDetails
        }else if (currentNavPage === 'schedule'){
            data = require('../assets/db.json').appointments
        }
        setSelectedSourceData(selected)
        dispatchListReducer({
            type: appActions.SETLISTDATA,
            newState : {
                listData: getList(data, headers),
                listHeaders : headers
            }
        })
        
    },[list.listData])

    useEffect(()=>{
        const array = require('../assets/db.json').floatingActions.filter(actionsObj => actionsObj.page === currentNavPage)
        dispatchFloatingActions({
            type:appActions.SETFLOATINGACTIONS,
            newState: {
                actionTitle:array[0].page,
                actions:array[0].actions
            }
        })
    }, currentNavPage)
    
    useEffect(()=>{
        const menu = require('../assets/db.json').overlayMenuTabs.filter(menu => menu.page === currentNavPage)
        menu.length > 0 && dispatchOverlayMenu({
            type: appActions.SETOVERLAYMENU,
            newState:{
                menu : menu[0].menuTabs,
                selectedMenuItemTabs : menu[0].menuTabs[0].overlayTab,
            }
        })            
    },[overlayMenu.menu, slideOverlay.slideOverlayStatus])


    //Suites
    handleOverlayTabChange = (tabIndex) => {   
        const filterMenu = overlayMenu.menu.filter((menuItem,index)=>index === overlayMenu.selectedMenuItem)
        const selectedMenuName = filterMenu[0].tabName
        const tabName = overlayMenu.selectedMenuItemTabs[tabIndex]
        dispatchOverlayMenu({
            type: appActions.OVERLAYTABCHANGE,
            newState : {selectedMenuItemCurrentTab : tabIndex}
        })
        dispatchSlideOverlay({
            type: appActions.OVERLAYTABCHANGEINFO,
            newState : {
                slideOverlayTabInfo : selectedListItem.selectedListObject[transformToCamel(selectedMenuName)][transformToCamel(tabName)]
            }
        })
    }

    handleSelectedMenuTab = (menuIndex) => {
        const currentTabs = overlayMenu.menu[menuIndex].overlayTab
        const selectedMenuName = overlayMenu.menu.filter((menuItem,index)=>index === menuIndex)
        const selectedTabName = currentTabs[0]
        dispatchOverlayMenu({
            type: appActions.OVERLAYMENUCHANGE,
            newState : {
                selectedMenuItem : menuIndex,
                selectedMenuItemTabs : currentTabs,
                selectedMenuItemCurrentTab : 0
            }
        })
        dispatchSlideOverlay({
            type: appActions.OVERLAYTABCHANGEINFO,
            newState : {
                slideOverlayTabInfo : selectedListItem.selectedListObject[transformToCamel(selectedMenuName[0].tabName)][transformToCamel(selectedTabName)]
            }
        })
    }

    toggleActionButton = () => {
        floatingActions.actionButtonState === false && setSearchPlaceholder("")
        dispatchFloatingActions({
            type:appActions.TOGGLEACTIONBUTTON,
            newState : !floatingActions.actionButtonState
        })
    }

    transformAction=()=>{
        dispatchFloatingActions({
            type: appActions.TOGGLEOPENACTION,
            newState : true
        })
    }

    closeSlideOverlay = () =>{
        dispatchSlideOverlay({
            type: appActions.CLOSESLIDEOVERLAY,
            newState : {
                slideOverlayStatus : false
            }
        })
    }

    getSelectedItem = (selectedId) => {
        const filterFiles = selectedSourceData.filter(item => item.id === selectedId)
        return filterFiles
    }

    handleSelectedListItem = (listItemId) => {
        const menuName = overlayMenu.menu[overlayMenu.selectedMenuItem].tabName
        const menuTab = overlayMenu.selectedMenuItemTabs[overlayMenu.selectedMenuItemCurrentTab]
        let selectedObj = getSelectedItem(listItemId)
        selectedObj.length > 0 && (
            dispatchSelectedListItem({
                type: appActions.SETSELECTEDLISTITEM,
                newState:{
                    selectedListItemId : listItemId,
                    selectedListObject : selectedObj[0]
                }
            }),
            dispatchSlideOverlay({
                type: appActions.SETSLIDEOVERLAY,
                newState : {
                    slideOverlayHeader : {"id":getPatient(listItemId).id,"name":`${getPatient(listItemId).name.firstName} ${getPatient(listItemId).name.middle} ${getPatient(listItemId).name.surname}`},
                    slideOverlayStatus : true,
                    slideOverlayTabInfo : selectedObj[0][transformToCamel(menuName)][transformToCamel(menuTab)]
                }
            })
        )
    }

    setListTabData = (list,headers) => {
        dispatchSlideOverlay({
            type: appActions.SETSLIDEOVERLAYLIST,
            newState : {
                slideOverlayList : list,
                slideOverlayListHeaders : headers
            }
        })
        return true
    }

    toggleCheckbox = (listItemId) => {
        dispatchListReducer({
            type: appActions.TOGGLECHECKBOX,
            newState : {
                checkedItemStatus : true,
                checkedItemsList : list.checkedItemsList.includes(listItemId) ? 
                    list.checkedItemsList.filter(listItem => listItem !== listItemId)
                    :
                    [...list.checkedItemsList,listItemId]
            }
        })
    }

    getSlideTop = (event) =>{
        setSlideTopValue(event.nativeEvent.layout.height)
    },

    getPageMeasure = (event) =>{
        setPageMeasure(event.nativeEvent.layout)
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
        currentNavPage
    }
    const methods = {
        getSlideTop, 
        getPageMeasure,
        toggleActionButton,  
        getList, 
        handleSelectedListItem, 
        handleOverlayTabChange, 
        toggleCheckbox, 
        dispatchPaginator, 
        handleSelectedMenuTab, 
        setListTabData, 
        transformToCamel,
        transformAction,
        getReportList,
        transformToSentence,
        closeSlideOverlay
    }
    return (  
        <SuitesContext.Provider value={{state, methods}}>
            {props.children}
        </SuitesContext.Provider>
    );
}
 