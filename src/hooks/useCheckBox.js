export const useCheckBox = (itemId, checkBoxList) => {
    return checkBoxList.includes(itemId) ?
        checkBoxList.filter(listItem => listItem !== itemId)
        :
        [...checkBoxList,itemId]

}