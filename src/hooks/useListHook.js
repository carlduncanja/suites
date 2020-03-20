import { transformToCamel } from "./useTextEditHook";
import moment from "moment";

export const getList = (sourceInformation, listHeaders) =>{
    let list = []
    sourceInformation.map((information)=>{
        list.push(getRecord(information,listHeaders))
    })
    return list
}

export const getReportList = (sourceInformation, listHeaders) =>{
    let list = []
    sourceInformation.forEach((information)=>{
        list.push(getRecord(information.list,listHeaders))
    })
    return list
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
    let filterPatient = require('../../assets/db.json').patients.filter(patient=> patient.id === id)
    return filterPatient[0]
}
