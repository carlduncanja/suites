import React, { useState, createContext, useEffect, useReducer} from 'react';
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
    const [overlayTabInfo, setOverlayTabInfo] = useState()
    const [overlayMenu, setOverlayMenu] = useState([])
        
    const [selectedListItemId, setSelectedListItemId] = useState();
    const [overlayHeader, setOverlayHeader] = useState({})
    const [selectedItem, setSelectedItem] = useState({})
    const [checkedItem, setCheckedItem] = useState(false);
    const [checkedItemsList, setCheckedItemsList] = useState([]);

    const {height} = Dimensions.get('window')
    //const [slideUpAnimValue, setSlildeUpAnimValue] = useState(new Animated.Value(0));
    
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
        getList(sourceData,listHeaders)
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
        setOverlaySelectedMenuName(menu[0].menuTabs[2].tabName)
        setOverlayCurrentMenuTabs(menu[0].menuTabs[2].overlayTab)
        setOverlaySelectedMenuTab(menu[0].menuTabs[2].overlayTab[2])

    },[overlayMenu])

    handleOverlayTabChange = (tabName) => {
        setOverlaySelectedMenuTab(tabName)
        setOverlayTabInfo(selectedItem[transformToCamel(overlaySelectedMenuName)][transformToCamel(tabName)])
    }

    handleSelectedMenuTab = (menuName) => {
        setOverlaySelectedMenuName(menuName)
        const currentMenu = overlayMenu.filter(menuItem => menuItem.tabName === menuName) 
        setOverlayCurrentMenuTabs(currentMenu[0].overlayTab)
        setOverlaySelectedMenuTab(currentMenu[0].overlayTab[0])
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
        setListData(list)
    }

    toggleActionButton = () => {
        setActionButtonState(!actionButtonState)
    }

    getSelectedItem = (selectedId) => {
        const filterFiles = selectedSourceData.filter(item => item.id === selectedId)
        return filterFiles[0]
    }

    handleSelectedListItem = (listItemId) => {
        setOverlayHeader({"id":getPatient(listItemId).id,"name":`${getPatient(listItemId).name.firstName} ${getPatient(listItemId).name.middle} ${getPatient(listItemId).name.surname}`})
        setSelectedListItemId(listItemId)
        let selectedObj = getSelectedItem(listItemId)
        setSelectedItem(selectedObj)
        setOverlayTabInfo(selectedObj[transformToCamel(overlaySelectedMenuName)][transformToCamel(overlaySelectedMenuTab)])
    }

    

    const slideUpAnimValue = new Animated.Value(0)
    animateSlide=()=>{
        Animated.timing(
            slideUpAnimValue,
            {
                toValue:height-100,
                duration:500,
                easing: Easing.cubic
            },
            
        ).start() && setSlildeUpAnimValue(height-200)
    }  

   

    toggleCheckbox = (listItemId) => {
        setCheckedItem(true)
        checkedItemsList.includes(listItemId) ?
            setCheckedItemsList(checkedItemsList.filter(listItem => listItem !== listItemId))
            :
            setCheckedItemsList([...checkedItemsList,listItemId])
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
        slideUpAnimValue,
        overlayHeader,
        overlayCurrentMenuTabs,
        overlayMenu,
        overlaySelectedMenuName,
        overlayTabInfo

    }
    const methods = {toggleActionButton, handleSelectedListItem, handleOverlayTabChange, toggleCheckbox, dispatchPaginator, animateSlide, handleSelectedMenuTab}
    return (  
        <SuitesContext.Provider value={{state, methods}}>
            {props.children}
        </SuitesContext.Provider>
    );
}
 