import { transformToCamel } from './useTextEditHook';
import { getList } from './useListHook'
import { useContext } from 'react';
import { SuitesContext } from '../contexts/SuitesContext';
import { appActions } from '../reducers/suitesAppReducer';

const listData = require('../assets/db.json').caseFiles.caseFilesInformation.data
const listHeaders  = require('../assets/db.json').caseFiles.caseFilesInformation.headers
const selectedData = require('../assets/db.json').caseFiles.caseDetails

export const getListData = (routeName) =>{
    const [state, dispatch] = useContext(SuitesContext);
    let transformedName = transformToCamel(routeName)
    dispatch({
        type: appActions.SETLISTDATA,
        newState : {
            listData: getList(listData, listHeaders),
            listHeaders : listHeaders,
            selectedSourceData : selectedData
        }
    })

    // return {"data":data,"headers":headers}
}