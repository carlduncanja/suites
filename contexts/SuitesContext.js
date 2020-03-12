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
    
    //List
    const [list, dispatchListReducer] = useReducer(suitesAppReducer, {
        listData: [],
        listHeaders: [],
        checkedItemStatus : false,
        checkedItemsList : []
    })
    //SLIDEOverlay

    const [overlayMenu, dispatchOverlayMenu] = useReducer(suitesAppReducer,{
        menu : [],
        selectedMenuItem : "",
        selectedMenuItemTabs : [],
        selectedMenuItemCurrentTab : ""
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
    
    //Case Files

    const [progressBar, dispatchProgressBar] = useReducer(suitesAppReducer,{
        progressContainerWidth : 0,
        progressList : []
    })

    const [report, dispatchReport] = useReducer(suitesAppReducer,{
        reportStatus : false,
        reportInformation : [],
        reportConsumablesList : [],
        reportConsumablesListHeaders : []
    })

    const [itemTitle, setItemTitle] = useState("")
    const [newItemSteps, setNewItemSteps] = useState([])
    const [itemStepNames, setItemStepNames] = useState([])
    const [currentStep, setCurrentStep] = useState("")
    const [currentStepObject, setCurrentStepObject]= useState({})
    const [currentStepTabs, setCurrentStepTabs] = useState([])
    const [currentSelectedStepTab, setCurrentSelectedStepTab] = useState("")
    const [currentSelectedStepTabObject, setCurrentSelectedStepTabObject] = useState({})
    const [currentSelectedStepTabs, setCurrentSelectedStepTabs] = useState([])
    const [currentTabPosition, setCurrentTabPosition] = useState(0)
    const [currentStepPosition, setCurrentStepPosition] = useState(0);  
    const [overlayComplete, setOverlayComplete] = useState(false)
    const [tabsCompletedList, setTabsCompletedList] = useState([])

        
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
                selectedMenuItem : menu[0].menuTabs[0].tabName,
                selectedMenuItemTabs : menu[0].menuTabs[0].overlayTab,
                selectedMenuItemCurrentTab : menu[0].menuTabs[0].overlayTab[0]
            }
        })            
    },[overlayMenu.menu, slideOverlay.slideOverlayStatus])

    useEffect(()=>{
        const stepsArray = require('../assets/db.json').createItem.filter(item => item.page === currentNavPage)
        stepsArray.length === 0 ?
            null:
            getPageNewItemSteps(stepsArray)
    }, currentNavPage)

    getPageNewItemSteps=(stepsArray)=>{
        const steps = []
        const tabs = []
        const tabObjects = []
        const stepsProgress = []
        stepsArray[0].steps.map(step=>steps.push(step.stepName))
        stepsArray[0].steps[0].tabs.map(tab=> 
            tabObjects.push(tab)&&
            tabs.push(tab.tabName)
        )
        steps.forEach(step=>stepsProgress.push({"step":step,"progress":0}))
        setItemStepNames(steps)
        setNewItemSteps(stepsArray[0])
        setItemTitle(stepsArray[0].title)
        setCurrentStepObject(stepsArray[0].steps[0])
        setCurrentStep(stepsArray[0].steps[0].stepName)
        setCurrentStepTabs(tabs)
        setTabsCompletedList(tabs[0])
        setCurrentSelectedStepTab(tabs[0])
        setCurrentSelectedStepTabs(tabObjects)
        setCurrentSelectedStepTabObject(tabObjects[0])
        dispatchProgressBar({
            type: appActions.UPDATEPROGRESSBARLIST,
            newState : {
                progressList : stepsProgress
            }
        })
    }
    

    handleOverlayTabChange = (tabName) => {
        dispatchOverlayMenu({
            type: appActions.OVERLAYTABCHANGE,
            newState : {selectedMenuItemCurrentTab : tabName}
        })
        dispatchSlideOverlay({
            type: appActions.OVERLAYTABCHANGEINFO,
            newState : {
                slideOverlayTabInfo : selectedListItem.selectedListObject[transformToCamel(overlayMenu.selectedMenuItem)][transformToCamel(tabName)]
            }
        })
    }

    handleSelectedMenuTab = (menuName) => {
        const currentMenu = overlayMenu.menu.filter(menuItem => menuItem.tabName === menuName) 
        const currentTabs = currentMenu[0].overlayTab
        const currentSelectedTab = currentTabs[0]
        dispatchOverlayMenu({
            type: appActions.OVERLAYMENUCHANGE,
            newState : {
                selectedMenuItem : menuName,
                selectedMenuItemTabs : currentTabs,
                selectedMenuItemCurrentTab : currentSelectedTab
            }
        })
        dispatchSlideOverlay({
            type: appActions.OVERLAYTABCHANGEINFO,
            newState : {
                slideOverlayTabInfo : selectedListItem.selectedListObject[transformToCamel(menuName)][transformToCamel(currentSelectedTab)]
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
                    slideOverlayTabInfo : selectedObj[0][transformToCamel(overlayMenu.selectedMenuItem)][transformToCamel(overlayMenu.selectedMenuItemCurrentTab)]
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

    handleNewItemTabChange = ()=>{    
        setTabsCompletedList(currentStepTabs.slice(0,currentTabPosition+1))
        currentTabPosition === currentSelectedStepTabs.length-1 ? 
            handleStepChange() 
            :
            handleTabChange()
    }

    handleTabChange = () =>{
        setCurrentTabPosition(currentTabPosition+1)
        setCurrentSelectedStepTabObject(currentSelectedStepTabs[currentTabPosition+1])
        setCurrentSelectedStepTab(currentSelectedStepTabs[currentTabPosition+1].tabName)
        handleProgressBar(currentTabPosition+1)
    }

    handleProgressBar = (tabPosition) =>{
        const tabLength = currentStepTabs.length
        let progress = 1/tabLength
        const objIndex = progressBar.progressList.findIndex(obj => obj.step === currentStep)
        const updatedObj = {...progressBar.progressList[objIndex], "progress":tabPosition * progress}
        const updatedList = [...progressBar.progressList.slice(0,objIndex),updatedObj,...progressBar.progressList.slice(objIndex+1)]
        dispatchProgressBar({
            type : appActions.UPDATEPROGRESSBARLIST,
            newState : {progressList:updatedList}
        })
    }

    handleStepChange = () =>{
        handleProgressBar(currentTabPosition+1)
        currentStepPosition === newItemSteps.steps.length -1 ?
            completeStep()
            :
            setStep()
 
    }

    completeStep = () =>{
        setOverlayComplete(true)
    }
    setStep = () =>{
        setCurrentStepPosition(currentStepPosition+1)
        setCurrentStepObject(newItemSteps.steps[currentStepPosition+1]) 
        setCurrentStep(newItemSteps.steps[currentStepPosition+1].stepName) 
        const tabNames = []
        const tabs = newItemSteps.steps[currentStepPosition+1].tabs
        tabs.map(tab=> tabNames.push(tab.tabName))
        setCurrentTabPosition(0) 
        setCurrentStepTabs(tabNames) 
        setCurrentSelectedStepTab(tabNames[0])
        setCurrentSelectedStepTabs(tabs) 
        setCurrentSelectedStepTabObject(tabs[0])
    }

    handleNewItemPress = (tabName) =>{
        const tabPosition = currentSelectedStepTabs.findIndex(tab => tab.tabName === tabName)
        tabsCompletedList.includes(tabName) && (
            setCurrentSelectedStepTab(tabName),
            setCurrentTabPosition(tabPosition),
            setCurrentSelectedStepTabObject(currentSelectedStepTabs.filter(tab => tab.tabName === tabName)[0]),
            setTabsCompletedList(tabsCompletedList.splice(0,tabsCompletedList.findIndex(tab => tab === tabName))),
            handleProgressBar(tabPosition)
        )
    }

    getProgressWidth = (width) =>{
        dispatchProgressBar({
            type: appActions.SETPROGRESSWIDTH,
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
            type: appActions.SETREPORTDETAILS,
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
            type : appActions.TOGGLEREPORT,
            newState:{
                reportStatus : false
            }
        })
    }
    const state = {
        pageTitle, 
        paginatorValues, 
        list,
        floatingActions,
        progressBar,
        searchPlaceholder, 
        slideOverlay,
        overlayMenu,
        slideTopValue,
        newItemSteps,
        currentStepObject,
        currentStep,
        itemTitle,
        itemStepNames,
        currentSelectedStepTab,
        currentStepTabs,
        currentSelectedStepTabObject,
        tabsCompletedList,
        overlayComplete,
        pageMeasure,
        report
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
        handleNewItemTabChange,
        handleNewItemPress,
        getProgressWidth,
        transformAction,
        openReportAction,
        getReportList,
        transformToSentence,
        closePreview,
        closeSlideOverlay
    }
    return (  
        <SuitesContext.Provider value={{state, methods}}>
            {props.children}
        </SuitesContext.Provider>
    );
}
 