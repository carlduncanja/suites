import React, {useContext} from 'react';
import {caseActions} from '../redux/reducers/caseFilesReducer';
import {CaseFileContext} from '../contexts/CaseFileContext';

// ################# Progress Bar

export const handleProgressBar = (
    tabIndex,
    progressList,
    selectedStep,
    tabsLength
) => {
    const progress = 1 / tabsLength;
    const objIndex = progressList.findIndex(obj => obj.step === selectedStep);
    const updatedObj = {
        ...progressList[objIndex],
        progress: (tabIndex + 1) * progress,
    };
    const updatedList = [
        ...progressList.slice(0, objIndex),
        updatedObj,
        ...progressList.slice(objIndex + 1),
    ];
    return updatedList;
};

export const handleNewItemProgressBar = (tabIndex, progressList) => {
    const newProgress = [];
    const objIndex = progressList.findIndex(obj => obj.step === tabIndex);
    for (let i = objIndex; i < progressList.length; i++) {
        const newObject = {...progressList[i], progress: 0};
        newProgress.push(newObject);
    }
    const updatedList = [...progressList.slice(0, objIndex), ...newProgress];
    return updatedList;
};

// ################# Pagination

export const useNextPaginator = (
    currentPage,
    recordsPerPage,
    currentListMin,
    currentListMax
) => ({
    currentPage: currentPage + 1,
    currentListMin: currentListMin + recordsPerPage,
    currentListMax: currentListMax + recordsPerPage,
});

export const nextDayPaginator = currentdate => ({currentdate: currentdate + 1});

export const previousDayPaginator = currentdate => ({currentdate: currentdate - 1});

export const usePreviousPaginator = (
    currentPage,
    recordsPerPage,
    currentListMin,
    currentListMax
) => ({
    currentPage: currentPage - 1,
    currentListMin: currentListMin - recordsPerPage,
    currentListMax: currentListMax - recordsPerPage,
});

// ################# Checkbox

export const useCheckBox = (item, checkBoxList) => (checkBoxList.includes(item) ?
    checkBoxList.filter(listItem => listItem !== item) :
    [...checkBoxList, item]);

export const checkboxItemPress = (item, id, checkBoxList) => {
    const updatedList = [...checkBoxList];
    return updatedList.includes(id) ?
        updatedList.filter(id => id !== item._id) :
        [...updatedList, item._id];
};

export const selectAll = (data, checkBoxList) => {
    const indeterminate =
        checkBoxList.length >= 0 && checkBoxList.length !== data.length;
    return indeterminate ? [...data.map(item => item._id)] : [];
};

// ################# Number formatters

export const formatAmount = amount => {
    const newAmountString = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `$ ${newAmountString}`;
};

export const calcBillingValues = (subTotal, tax, discountPercent) => {
    const discount = subTotal * discountPercent;
    const discountedValue = subTotal - discount;
    const total = discountedValue * (1 + tax);

    return {discount, total};
};
