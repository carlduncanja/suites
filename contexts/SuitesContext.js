import React, { useState, createContext, useEffect, useReducer, useRef} from 'react';
import {Text, StyleSheet, Animated, Dimensions, Easing} from 'react-native';
import { paginatorReducer, sourceDataReducer, selectedSourceDataReducer, overlayMenuTabDataReducer } from '../reducers/SuitesReducer'
import moment from 'moment';
import SvgIcon from '../assets/SvgIcon';

export const SuitesContext = createContext()

export const SuitesContextProvider = (props) => {
    
    const [sourceData, dispatchSourceReducer] = useReducer(sourceDataReducer,[])
    const [selectedSourceData, dispatchSelectedReducer] = useReducer(selectedSourceDataReducer,[])
    const [listData, setListData] = useState([])
    const [currentNavPage, setCurrentNavPage] = useState("caseFiles")
    const [floatingActions, setFloatingActions] = useState({})
    const [openAction, setOpenAction] = useState(false)
    const [progressContainerWidth, setProgressContainerWidth] = useState(0)

    const [newItemSteps, setNewItemSteps] = useState([])
    const [itemTitle, setItemTitle] = useState("")
    const [itemSteps, setItemSteps] = useState([])
    const [currentStepObject, setCurrentStepObject]= useState({})
    const [currentStepTabs, setCurrentStepTabs] = useState([])
    const [currentSelectedStepTab, setCurrentSelectedStepTab] = useState("")
    const [currentSelectedStepTabObject, setCurrentSelectedStepTabObject] = useState({})
    const [currentStep, setCurrentStep] = useState("")
    const [currentSelectedStepTabs, setCurrentSelectedStepTabs] = useState([])
    const [currentTabPosition, setCurrentTabPosition] = useState(0)
    const [currentStepPosition, setCurrentStepPosition] = useState(0);
    const [overlayText, setOverlayText] = useState("NEXT")
    const [progressList, setProgressList] = useState([])

    const [pageTitle, setPageTitle] = useState('Case Files')
    const [searchPlaceholder, setSearchPlaceholder] = useState("Search by any heading or entry below")
    const [listHeaders, setListHeaders] = useState(["Patient","Balance","Staff","Next Visit"])
    const [actionButtonState, setActionButtonState] = useState(false);
    const [overlaySelectedMenuName, setOverlaySelectedMenuName] = useState(null)
    const [overlaySelectedMenuTab, setOverlaySelectedMenuTab] = useState(null)
    const [overlayCurrentMenuTabs, setOverlayCurrentMenuTabs] = useState(null)
    const [overlayTabInfo, setOverlayTabInfo] = useState({})
    const [overlayMenu, setOverlayMenu] = useState([])
    const [overlayStatus, setOverlayStatus] = useState(false)
    const [overlayList, setOverlayList] = useState([])
    const [overlayListHeaders, setOverlayListHeaders] = useState([])
    const [slideTopValue, setSlideTopValue] = useState(0);
        
    const [selectedListItemId, setSelectedListItemId] = useState();
    const [overlayHeader, setOverlayHeader] = useState({})
    const [selectedItem, setSelectedItem] = useState({})
    const [checkedItem, setCheckedItem] = useState(false);
    const [checkedItemsList, setCheckedItemsList] = useState([]);

  
    
    const [paginatorValues, dispatchPaginator] = useReducer(paginatorReducer,{
        currentPage:1,
        sliceArrayStart:0,
        sliceArrayEnd:10,
        totalPages: 0,
        recordsPerPage:10
    })

    const [overlayPaginatorValues, dispatchOverlayPaginator] = useReducer(paginatorReducer, {
        currentPage:1,
        sliceArrayStart:0,
        sliceArrayEnd:20,
        totalPages:0,
        recordsPerPage:20
    })

    useEffect(()=>{
        dispatchPaginator({type:'SET_TOTAL_PAGES', listData:listData})
    })

    useEffect(()=>{
        let sourceType = `GET_${currentNavPage.toUpperCase()}`
        let selectedType = `GET_SELECTED_${currentNavPage.toUpperCase()}`
        dispatchSourceReducer({type:`${sourceType}`})   
        dispatchSelectedReducer({type:`${selectedType}`})
        setListData(getList(sourceData,listHeaders))
    },[sourceData])

    useEffect(()=>{
        const array = require('../assets/db.json').floatingActions.filter(actionsObj => actionsObj.page === currentNavPage)
        setFloatingActions({
            actionTitle:array[0].page,
            actions:array[0].actions
        })
    }, currentNavPage)

    useEffect(()=>{
        const stepsArray = require('../assets/db.json').createItem.filter(item => item.page === currentNavPage)
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
        setItemSteps(steps)
        setNewItemSteps(stepsArray[0])
        setItemTitle(stepsArray[0].title)
        setCurrentStepObject(stepsArray[0].steps[0])
        setCurrentStep(stepsArray[0].steps[0].stepName)
        setCurrentStepTabs(tabs)
        setCurrentSelectedStepTab(tabs[0])
        setCurrentSelectedStepTabs(tabObjects)
        setCurrentSelectedStepTabObject(tabObjects[0])
        setProgressList(stepsProgress)
    }, currentNavPage)

    
    useEffect(()=>{
        const menu = require('../assets/db.json').overlayMenuTabs.filter(menu => menu.page === currentNavPage)
        setOverlayMenu(menu[0].menuTabs)
        setOverlaySelectedMenuName(menu[0].menuTabs[0].tabName)
        setOverlayCurrentMenuTabs(menu[0].menuTabs[0].overlayTab)
        setOverlaySelectedMenuTab(menu[0].menuTabs[0].overlayTab[0])
    },[overlayMenu, overlayStatus])

    handleOverlayTabChange = (tabName) => {
        setOverlaySelectedMenuTab(tabName)
        setOverlayTabInfo(selectedItem[transformToCamel(overlaySelectedMenuName)][transformToCamel(tabName)])
    }

    handleSelectedMenuTab = (menuName) => {
        setOverlaySelectedMenuName(menuName)
        const currentMenu = overlayMenu.filter(menuItem => menuItem.tabName === menuName) 
        const currentTabs = currentMenu[0].overlayTab
        const currentSelectedTab = currentTabs[0]
        setOverlayCurrentMenuTabs(currentTabs)
        setOverlaySelectedMenuTab(currentSelectedTab)
        setOverlayTabInfo(selectedItem[transformToCamel(menuName)][transformToCamel(currentSelectedTab)])
    }

    getField = (field, data) => {
        let fieldData = []
        Object.keys(data).forEach(key=>{
            key === field ?
                key === 'actions' ?
                    fieldData.push({"actions":data[key]})
                    :
                    fieldData.push(data[key])
                :
                null
        })
        return fieldData[0]
    }

    getNameObject = (obj) =>{
        return({"id":obj.id, "name":`${obj.name.firstName} ${obj.name.surname}`})
    }

    getPatient = (id) =>{
        let filterPatient = require('../assets/db.json').patients.filter(patient=> patient.id === id)
        return filterPatient[0]
    }

    getAction = (obj) => {
        return 
    }

    getRecord = (data, listHeaders) =>{
        newArray = []
        listHeaders.map((header)=>{
            newHeader = transformToCamel(header)
            newHeader === 'patient'?
                newArray.push(getNameObject(getPatient(data.id)))
                :
                newHeader === 'nextVisit' ?
                    newArray.push(moment(getField(newHeader, data)).format("MMM D, YYYY"))
                    :
                        newArray.push(getField(newHeader, data))
        })

        newObject={
            "recordId":getField("id", data),
            "recordInformation":newArray
        }
        return newObject
    }

    transformToCamel = (word) =>{
        let newWord = word.replace(/ /g,"");
        return (newWord.charAt(0).toLowerCase().concat(newWord.substring(1,newWord.length)))
    }

    getList = (sourceInformation, listHeaders) =>{
        let list = []
        sourceInformation.map((information)=>{
            list.push(getRecord(information,listHeaders))
        })
        return list
    }

    toggleActionButton = () => {
        setActionButtonState(!actionButtonState)
    }

    getSelectedItem = (selectedId) => {
        const filterFiles = selectedSourceData.filter(item => item.id === selectedId)
        return filterFiles
    }

    handleSelectedListItem = (listItemId) => {
        setOverlayHeader({"id":getPatient(listItemId).id,"name":`${getPatient(listItemId).name.firstName} ${getPatient(listItemId).name.middle} ${getPatient(listItemId).name.surname}`})
        setSelectedListItemId(listItemId)
        let selectedObj = getSelectedItem(listItemId)
        selectedObj.length > 0 && setOverlayStatus(true)
        selectedObj.length > 0 && setSelectedItem(selectedObj[0])
        selectedObj.length > 0 && setOverlayTabInfo(selectedObj[0][transformToCamel(overlaySelectedMenuName)][transformToCamel(overlaySelectedMenuTab)])
    }

    setListTabData = (list,headers) => {
        setOverlayListHeaders(headers)
        setOverlayList(list)
        return true
    }

    toggleCheckbox = (listItemId) => {
        setCheckedItem(true)
        checkedItemsList.includes(listItemId) ?
            setCheckedItemsList(checkedItemsList.filter(listItem => listItem !== listItemId))
            :
            setCheckedItemsList([...checkedItemsList,listItemId])
    }

    handleOverlayClose = () => {
        setOverlayStatus(false)
    }

    getSlideTop = (event) =>{
        setSlideTopValue(event.nativeEvent.layout.height)
    },

    handleNewItemTabChange = ()=>{
        currentTabPosition === currentSelectedStepTabs.length-1 ? 
            handleStepChange() 
            :
            handleTabChange()
    }

    handleTabChange = () =>{
        setCurrentTabPosition(currentTabPosition+1)
        setCurrentSelectedStepTabObject(currentSelectedStepTabs[currentTabPosition+1])
        setCurrentSelectedStepTab(currentSelectedStepTabs[currentTabPosition+1].tabName)
        handleProgressBar()
    }

    handleProgressBar = () =>{
        const tabLength = currentStepTabs.length
        let progress = 1/tabLength
        const currentProgress = progressList.filter(obj=>obj.step === currentStep)[0].progress
        const objIndex = progressList.findIndex(obj => obj.step === currentStep)
        const updatedObj = {...progressList[objIndex], "progress":currentProgress+progress}
        const updatedList = [...progressList.slice(0,objIndex),updatedObj,...progressList.slice(objIndex+1)]
        setProgressList(updatedList)
    }

    handleStepChange = () =>{
        handleProgressBar()
        currentStepPosition === newItemSteps.steps.length -1 ?
            console.log("Go to edit")
            :
            setStep()
 
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
        console.log("Pressed", tabName)
    }

    getProgressWidth = (width) =>{
        setProgressContainerWidth(width) 
    }

    transformAction=()=>{
        setOpenAction(true)
        console.log("Open Action")
    }

    const state = {
        pageTitle, 
        paginatorValues, 
        floatingActions,
        searchPlaceholder, 
        actionButtonState, 
        selectedListItemId, 
        checkedItem, 
        checkedItemsList, 
        listData, 
        listHeaders,
        selectedItem,
        overlaySelectedMenuTab,
        overlayHeader,
        overlayCurrentMenuTabs,
        overlayMenu,
        overlaySelectedMenuName,
        overlayTabInfo,
        overlayStatus,
        slideTopValue,
        overlayList,
        overlayListHeaders,
        newItemSteps,
        currentStepObject,
        currentStep,
        itemTitle,
        itemSteps,
        currentSelectedStepTab,
        currentStepTabs,
        currentSelectedStepTabObject,
        overlayText,
        progressList,
        progressContainerWidth,
        openAction
    }
    const methods = {
        getSlideTop, 
        toggleActionButton, 
        handleOverlayClose, 
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
        transformAction
    }
    return (  
        <SuitesContext.Provider value={{state, methods}}>
            {props.children}
        </SuitesContext.Provider>
    );
}
 