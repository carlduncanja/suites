import React, { useContext } from 'react';
import { caseActions } from '../redux/reducers/caseFilesReducer'
import { CaseFileContext } from '../contexts/CaseFileContext';


export const handleProgressBar = (tabIndex, progressList, selectedStep, tabsLength ) =>{
    let progress = 1/tabsLength
    const objIndex = progressList.findIndex(obj => obj.step === selectedStep)
    const updatedObj = {...progressList[objIndex], "progress":(tabIndex+1) * progress}
    const updatedList = [...progressList.slice(0,objIndex),updatedObj,...progressList.slice(objIndex+1)]
    return updatedList
}

export const handleNewItemProgressBar = (tabIndex, progressList) =>{
    let newProgress = []
    const objIndex = progressList.findIndex(obj => obj.step === tabIndex)
    for (let i = objIndex; i < progressList.length; i++){
        let newObject = {...progressList[i], "progress":0}
        newProgress.push(newObject)
    }
    const updatedList = [...progressList.slice(0,objIndex),...newProgress]
    return updatedList
}

export const useNextPaginator = (currentPage, recordsPerPage, currentListMin, currentListMax ) => {
    return (
        {
            "currentPage":currentPage +1,
            "currentListMin" : currentListMin + recordsPerPage,
            "currentListMax": currentListMax + recordsPerPage
        }
    )
}

export const usePreviousPaginator = (currentPage, recordsPerPage, currentListMin, currentListMax ) => {
    return (
        {
            "currentPage":currentPage -1,
            "currentListMin" : currentListMin - recordsPerPage,
            "currentListMax": currentListMax - recordsPerPage
        }
    )
}

export const useCheckBox = (item, checkBoxList) => {
    return checkBoxList.includes(item) ?
        checkBoxList.filter(listItem => listItem !== item)
        :
        [...checkBoxList,item]
}

export const formatAmount = (amount) => {
    let newAmountString = (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    return `$ ${newAmountString}`
}

export const calcBillingValues = (subTotal, tax, discountPercent) =>{
    let discount = subTotal * discountPercent
    let discountedValue = subTotal - discount
    let total = discountedValue * (1 + tax)

    return {discount, total}
}
