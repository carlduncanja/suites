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
    })
    
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
            key === field &&
                fieldData.push(data[key])
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
        overlayListHeaders

    }
    const methods = {getSlideTop, toggleActionButton, handleOverlayClose, getList, handleSelectedListItem, handleOverlayTabChange, toggleCheckbox, dispatchPaginator, handleSelectedMenuTab, setListTabData}
    return (  
        <SuitesContext.Provider value={{state, methods}}>
            {props.children}
        </SuitesContext.Provider>
    );
}
 